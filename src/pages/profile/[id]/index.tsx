import React, { useEffect } from 'react'

import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import style from './profile-id.module.scss'

import { SomePost } from '@/entities/some-post/some-post'
import { PublicProfileData } from '@/features/public-profile'
import { publicApi, selectIsLoggedIn } from '@/shared/api'
import { setLikeAvatar } from '@/shared/api/services/posts/post.slice'
import { useLazyGetProfileUserQuery } from '@/shared/api/services/profile/profile.api'
import {
  PublicProfilePostsResponseType,
  PublicProfileType,
} from '@/shared/api/services/public/public.api.types'
import { getLayout } from '@/shared/layouts/main-layout/main-layout'
import { wrapper } from '@/shared/providers/store-provider/model/store'
import { ServerSidePropsType } from '@/shared/types/common-types'
import { ContentWrapper } from '@/shared/ui'

type PropsType = {
  profileData: PublicProfileType
  postData: PublicProfilePostsResponseType
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  store => async context => {
    const { id } = context.query
    const locale = context.locale

    if (locale === undefined) throw new Error()

    // get data about user
    store.dispatch(
      publicApi.endpoints?.getPublicProfile.initiate(Number(id), { forceRefetch: true })
    )

    const data: Array<ServerSidePropsType<PublicProfileType>> = await Promise.all(
      store.dispatch(publicApi.util?.getRunningQueriesThunk())
    )
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })

    if (!data[0].data) {
      return {
        redirect: {
          destination: '/404' /*  todo Редирект на 404  */,
          permanent: false,
        },
      }
    }

    // get data about user's posts
    store.dispatch(
      publicApi.endpoints?.getPublicProfilePosts.initiate(
        { userId: Number(id) },
        { forceRefetch: true }
      )
    )
    const post: Array<ServerSidePropsType<PublicProfilePostsResponseType>> = await Promise.all(
      store.dispatch(publicApi.util?.getRunningQueriesThunk())
    )
      .then(res => {
        return res
      })
      .catch(error => {
        return error
      })

    return {
      props: {
        ...(await serverSideTranslations(locale as string, 'common')),
        profileData: data[0].data,
        postData: post[0].data,
      },
    }
  }
)

function PublicProfilePage(props: PropsType) {
  const { profileData, postData } = props

  const amountPost = postData.items?.length
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useDispatch()
  const [getProfileUser, { data: userProfileData }] = useLazyGetProfileUserQuery()

  useEffect(() => {
    if (isLoggedIn) {
      getProfileUser()
        .unwrap()
        .then(res => {
          dispatch(setLikeAvatar({ id: res?.id, url: res?.avatars[1]?.url }))
        })
    }
  }, [isLoggedIn])

  return (
    <div className={style.publicProfileWrapper}>
      <Toaster position={'bottom-center'} />
      <ContentWrapper className={style.contentWrapper}>
        {isLoggedIn && (
          <div className={style.publicProfileContainer}>
            <div className={style.profileContainer}>
              <PublicProfileData data={profileData} amountPost={amountPost} />
            </div>
            <div className={style.postsContainer}>
              {postData &&
                postData.items.map(post => (
                  <SomePost
                    key={post.id}
                    p={post}
                    isLoggedIn={isLoggedIn}
                    profileData={userProfileData}
                  />
                ))}
            </div>
          </div>
        )}
      </ContentWrapper>
    </div>
  )
}

PublicProfilePage.getLayout = getLayout
export default PublicProfilePage
