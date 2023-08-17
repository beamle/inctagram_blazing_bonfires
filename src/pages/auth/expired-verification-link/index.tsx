import React, { useState } from 'react'

import { CircularProgress } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import styles from 'src/pages/auth/expired-verification-link/ExpiredVerificationLink.module.scss'

import { SignUpType } from '@/shared/api'
import { useResendVerificationLinkMutation } from '@/shared/api/model/auth.api'
import { ResendVerificationLinkType } from '@/shared/api/model/auth.api.types'
import broResend from '@/shared/assets/icons/login/broResend.svg'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button'
import { Modal } from '@/shared/ui/Modal/Modal'
import { getLayout } from '@/widgets/layout/MainLayout/MainLayout'

const ExpiredVerificationLinkPage = () => {
  const [resendNewVerificationLink, { isLoading }] = useResendVerificationLinkMutation()
  const [resendVerificationLinkSuccess, setResendVerificationLinkSuccess] = useState(false)
  const callBackCloseWindow = () => setResendVerificationLinkSuccess(false)

  const router = useRouter()
  const { query } = router
  const { email, baseUrl } = query

  const { handleSubmit } = useForm<ResendVerificationLinkType>({
    mode: 'onChange',
    defaultValues: {
      email: email,
      baseUrl: baseUrl,
    },
  })
  const onSubmit: SubmitHandler<ResendVerificationLinkType> = (
    data: ResendVerificationLinkType
  ) => {
    resendNewVerificationLink(data)
      .unwrap()
      .then(() => {
        setResendVerificationLinkSuccess(true)
      })
      .catch(error => console.log(error))
  }

  return (
    <>
      {resendVerificationLinkSuccess && (
        <Modal title={'New link sent'} mainButton={'OK'} callBackCloseWindow={callBackCloseWindow}>
          <p>We have sent a new link to your email</p>
        </Modal>
      )}
      {isLoading && <CircularProgress />}
      <div className={styles.expiredContainer}>
        <h3>Email verification link expired</h3>
        <p>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button theme={ButtonTheme.FILLED} size={ButtonSize.LARGE}>
            Resend verification link
          </Button>
        </form>
        <Image src={broResend} alt={'man waits and looks at clock'} />
      </div>
    </>
  )
}

ExpiredVerificationLinkPage.getLayout = getLayout
export default ExpiredVerificationLinkPage
