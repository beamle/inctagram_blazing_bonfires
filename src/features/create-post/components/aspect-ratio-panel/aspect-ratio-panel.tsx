import React from 'react'

import { Popover } from '@headlessui/react'
import Image from 'next/image'

import styles from './aspect-ratio-panel.module.scss'

import style from '@/features/create-post/components/button-filter-panel/button-filter-panel.module.scss'
import HorizontalRectangle from '@/features/create-post/ui/icons/horizontal-rectangle'
import OriginalAspectIcon from '@/features/create-post/ui/icons/original-aspect-icon'
import SquareIcon from '@/features/create-post/ui/icons/square-icon'
import VerticalRectangle from '@/features/create-post/ui/icons/vertical-rectangle'
import sizePhoto from '@/shared/assets/icons/filter-post-photo/size.svg'
import { Button, ButtonTheme } from '@/shared/ui'

interface AspectRatioPanelProps {
  handleAspectRatio: (aspect: number) => void
  originalAspect: number
}

const aspectRatio = {
  square: 1,
  verticalRectangle: 4 / 5,
  horizontalRectangle: 16 / 9,
}

const AspectRatioPanel: React.FC<AspectRatioPanelProps> = ({
  originalAspect,
  handleAspectRatio,
}) => {
  return (
    <Popover className={styles.relative}>
      <Popover.Panel className={styles.buttonPanel}>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(originalAspect)
          }}
        >
          <span>Оригинал</span>
          <OriginalAspectIcon color={'#fff'} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(aspectRatio.square)
          }}
        >
          <span>1:1</span>
          <SquareIcon color={'#fff'} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(aspectRatio.verticalRectangle)
          }}
        >
          <span>4:5</span>
          <VerticalRectangle color={'#fff'} />
        </button>
        <button
          className={styles.button}
          onClick={() => {
            handleAspectRatio(aspectRatio.horizontalRectangle)
          }}
        >
          <span>16:9</span>
          <HorizontalRectangle color={'#fff'} />
        </button>
      </Popover.Panel>
      <Popover.Button as="div">
        <Button theme={ButtonTheme.CLEAR} className={style.sizeButton}>
          <Image src={sizePhoto} alt={''} />
        </Button>
      </Popover.Button>
    </Popover>
  )
}

export default AspectRatioPanel