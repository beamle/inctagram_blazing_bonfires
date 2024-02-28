import React from 'react'

import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ContentWrapper } from '@/features/user-management'
import { getAdminOnlyHeaderLayout } from '@/shared/layouts'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  if (locale === undefined) throw new Error()

  return {
    props: {
      ...(await serverSideTranslations(locale, 'common')),
    },
  }
}

export async function getStaticPaths() {
  return { paths: [], fallback: true }
}

const Following = () => {
  return <ContentWrapper>following</ContentWrapper>
}

Following.getLayout = getAdminOnlyHeaderLayout
export default Following