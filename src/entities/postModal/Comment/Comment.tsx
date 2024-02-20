import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import styles from './Comment.module.scss'

import { useMeQuery } from '@/shared/api'
import { PostResponseType } from '@/shared/api/services/posts/posts.api.types'
import noImage from '@/shared/assets/icons/avatarProfile/notPhoto.png'
import likeIcon from '@/shared/assets/icons/icons/likeIcon.svg'
import saveIcon from '@/shared/assets/icons/icons/saveIcon.svg'
import shareIcon from '@/shared/assets/icons/icons/shareIcon.svg'
import { findDate } from '@/shared/utils/findDate'

type Props = {
  postData: PostResponseType
  isLoggedIn: boolean
}

export const Comment = ({ postData, isLoggedIn }: Props) => {
  const {
    owner: { lastName, firstName },
    avatarOwner,
    updatedAt,
    createdAt,
    description,
  } = postData

  console.log(postData)

  const { t } = useTranslation('common', { keyPrefix: 'Post' })
  const postCreatedAt = findDate.format(createdAt)
  const postUpdatedAt = findDate.difference(updatedAt)

  const postLikes = 2435
  const userName = firstName && lastName ? `${firstName} ${lastName}` : `${t('AnonymousUser')}`

  return (
    <div className={styles.commentContainerWrapper}>
      <div className={styles.summaryContainer}>
        {isLoggedIn && (
          <div className={styles.actionsContainer}>
            <div className={styles.likeShareContainer}>
              <Image src={likeIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
              <Image
                src={shareIcon}
                width={24}
                height={24}
                style={{ cursor: 'pointer' }}
                alt={''}
              />
            </div>
            <div>
              <Image src={saveIcon} width={24} height={24} style={{ cursor: 'pointer' }} alt={''} />
            </div>
          </div>
        )}
        <div className={styles.totalLikes}>
          <div className={styles.avatarContainer}>
            <Image
              className={styles.totalLikesAvatar}
              src={avatarOwner || noImage}
              alt={'avatar'}
              width={24}
              height={24}
            />
          </div>
          <p className={styles.totalLikesCount}>
            {postLikes.toLocaleString()} {t('Likes')}
          </p>
        </div>
        <div className={styles.postDate}>{postCreatedAt}</div>
      </div>
      {isLoggedIn && (
        <div className={styles.addCommentContainer}>
          <form className={styles.addCommentForm}>
            <input className={styles.addCommentInput} placeholder={t('AddComment')} type="text" />
            <button className={styles.addCommentButton}>{t('Publish')}</button>
          </form>
        </div>
      )}
    </div>
  )
}
