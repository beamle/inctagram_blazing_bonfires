import React, { useState } from 'react'

import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import s from './PublicPost.module.scss'

import { PostModal } from '@/entities/postModal/PostModal'
import { PostResponseType } from '@/shared/api'
import noImage from '@/shared/assets/icons/image/no-image.svg'
import { UseGetShowHideText } from '@/shared/hooks'
import { findDate } from '@/shared/utils/findDate'

export const PublicPost = (post: PostResponseType) => {
  const {
    images,
    owner: { lastName, firstName },
    avatarOwner,
    description,
    createdAt,
    id,
  } = post

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const [isPostActive, setIsPostActive] = useState(false)

  const postCreatedAt = findDate.difference(post.createdAt)

  const { displayShowMore, isShowMoreActive, setIsShowMoreActive, fullText } = UseGetShowHideText(
    post.description,
    80
  )

  return (
    <div className={s.post} key={post.id}>
      <Image src={post.images[0]?.url} width={234} height={240} alt="Picture of the post" />
      <div className={s.postContentWrapper}>
        <Image src={post.avatarOwner ?? noImage} width={36} height={36} alt={'Avatar picture'} />
        <h3 onClick={() => setIsPostActive(true)} className={s.profileUrl}>
          {post.owner.firstName} {post.owner.lastName}
        </h3>
      </div>
      <div>{postCreatedAt}</div>
      <p className={s.postDescription}>
        {fullText}{' '}
        {displayShowMore && (
          <span onClick={() => setIsShowMoreActive(!isShowMoreActive)} className={s.showMore}>
            {isShowMoreActive ? 'Hide' : 'Show more'}
          </span>
        )}
      </p>

      {isPostActive && <PostModal postData={post} togglePostModal={togglePostModal} />}
    </div>
  )
}
