'use client'
import styled from 'styled-components'
import { Photo } from '@/app/types'
import { mediaQuery } from '@/app/utils/media-query'
import { FALLBACK_IMG, STICKY_HEADER_HEIGHT } from '@/app/constants'

const _DownButton = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M58.4962 29.9981C58.4962 45.7372 45.7372 58.4962 29.9981 58.4962C14.259 58.4962 1.5 45.7372 1.5 29.9981C1.5 14.259 14.259 1.5 29.9981 1.5C45.7372 1.5 58.4962 14.259 58.4962 29.9981Z"
          fill="white"
          stroke="#27B5F7"
          strokeWidth="3"
        ></path>
        <path
          d="M44 26L29.9944 40L16 26"
          stroke="#27B5F7"
          strokeWidth="4"
        ></path>
      </g>
    </svg>
  )
}

export const DownButton = styled(_DownButton)`
  cursor: pointer;
`

const Title = styled.h1`
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 10px #00537a;
  color: #fff;

  ${mediaQuery.mediumAbove} {
    font-size: 42px;
  }

  ${mediaQuery.smallOnly} {
    font-size: 30px;
  }
`

const SubTitle = styled.h2`
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 10px #00537a;
  color: #fff;

  ${mediaQuery.mediumAbove} {
    font-size: 20px;
  }

  ${mediaQuery.smallOnly} {
    font-size: 16px;
  }
`

const _TitleContainer = ({
  title,
  subtitle,
  className,
}: {
  title: string
  subtitle?: string
  className?: string
}) => {
  return (
    <div className={className}>
      <Title>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </div>
  )
}

export const TitleContainer = styled(_TitleContainer)`
  max-width: 750px;

  ${mediaQuery.mediumAbove} {
    width: 100%;
  }

  ${mediaQuery.smallOnly} {
    width: calc(330 / 375 * 100%);
  }
`

export const BackgroundImage = styled.div<{
  $imageEntity: Photo
  $mobileImageEntity?: Photo
}>`
  width: 100vw;
  height: calc(100vh - ${STICKY_HEADER_HEIGHT}px);
  background-image: image-set(
    url(${({ $imageEntity }) => $imageEntity?.resized?.medium ?? FALLBACK_IMG})
      1x,
    url(${({ $imageEntity }) => $imageEntity?.resized?.large ?? FALLBACK_IMG})
      2x
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  /* make children align center*/
  position: relative;

  ${TitleContainer} {
    /* horizontal and vertical center */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  ${DownButton} {
    position: absolute;
  }

  ${mediaQuery.largeOnly} {
    background-image: image-set(
      url(${({ $imageEntity }) => $imageEntity?.resized?.large ?? FALLBACK_IMG})
        1x
    );
    ${DownButton} {
      bottom: 50px;
      width: 60px;
      left: calc(50% - 30px);
    }
  }

  ${mediaQuery.mediumOnly} {
    ${DownButton} {
      bottom: 40px;
      width: 50px;
      left: calc(50% - 25px);
    }
  }

  ${mediaQuery.smallOnly} {
    background-image: image-set(
      url(${({ $imageEntity }) => $imageEntity?.resized?.small ?? FALLBACK_IMG})
        1x,
      url(${({ $imageEntity }) =>
          $imageEntity?.resized?.medium ?? FALLBACK_IMG})
        2x
    );
    ${DownButton} {
      bottom: 30px;
      width: 40px;
      left: calc(50% - 20px);
    }
  }

  ${mediaQuery.smallOnly} {
    ${({ $mobileImageEntity }) => {
      const url = $mobileImageEntity?.resized?.small ?? FALLBACK_IMG
      if (url) {
        return `background-image: url(${url})`
      }

      return ''
    }}
  }
`

export const PublishedDate = styled.div`
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 70px;
  color: #a3a3a3;
`

export default {
  Title,
  BackgroundImage,
  DownButton,
  SubTitle,
  PublishedDate,
}
