import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

import Image from 'next/image'

import enFlag from '../../../../public/languages/flagBritish.svg'
import ruFlag from '../../../../public/languages/flagRus.svg'
import arrowSvg from '../../../../public/select/arrowForSelect.svg'

import style from './LanguageSelect.module.scss'
import { OptionContent } from './OptionContent'

export enum ShortLangType {
  RU = 'Ru',
  EN = 'En',
}

export enum FullLangType {
  RU = 'Russian',
  EN = 'English',
}

export enum FlagType {
  RU = ruFlag,
  EN = enFlag,
}

type LangOptionType = {
  shortLang: ShortLangType
  fullLang: FullLangType
  flag: FlagType
}

const langOptions: LangOptionType[] = [
  { shortLang: ShortLangType.RU, fullLang: FullLangType.RU, flag: FlagType.RU },
  { shortLang: ShortLangType.EN, fullLang: FullLangType.EN, flag: FlagType.EN },
]

export const LanguageSelect = () => {
  const refSelect = useRef<HTMLDivElement | null>(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [activeSelect, setActiveSelect] = useState<ShortLangType>(ShortLangType.RU)

  const openSelectHandler = () => setIsOpenSelect(!isOpenSelect)
  const changeLanguageHandler = (lang: ShortLangType) => {
    setActiveSelect(lang)
    openSelectHandler()
  }

  const closeOpenMenus = (e: DocumentEventMap['mousedown']) => {
    if (
      refSelect.current &&
      isOpenSelect &&
      !refSelect.current!.contains(e.target as HTMLDivElement)
    ) {
      setIsOpenSelect(false)
    }
  }

  const { shortLang, fullLang, flag } =
    langOptions.find(el => el.shortLang === activeSelect) || langOptions[0]

  useEffect(() => {
    if (isOpenSelect) {
      document.addEventListener('mousedown', closeOpenMenus)
    }

    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
  }, [isOpenSelect])

  return (
    <>
      <div className={style.select} ref={refSelect}>
        <div className={style.selectContent} onClick={openSelectHandler}>
          <OptionContent alt={shortLang} flagImg={flag} description={fullLang} />
          <Image
            src={arrowSvg}
            alt={''}
            className={style.arrowImg}
            style={{ transform: isOpenSelect ? 'rotate(180deg)' : 'rotate(0)' }}
          />
        </div>
        {isOpenSelect && (
          <div className={style.optionList}>
            {langOptions.map(el => (
              // eslint-disable-next-line react/jsx-key
              <div className={style.option} onClick={() => changeLanguageHandler(el.shortLang)}>
                <OptionContent alt={el.shortLang} flagImg={el.flag} description={el.fullLang} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
