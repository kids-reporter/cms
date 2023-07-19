// @ts-ignore @twreporter/core does not provide ts header file
import mq from '@twreporter/core/lib/utils/media-query'
import styled from 'styled-components'

const mockup = {
  mobile: {
    figure: {
      width: '100%',
    },
    caption: {
      width: 250, // px
    },
  },
  tablet: {
    figure: {
      width: '100%',
    },
    caption: {
      width: 512, // px
    },
  },
  desktop: {
    figure: {
      width: {
        normal: 100, // %
        small: 403, // px
      },
    },
    caption: {
      width: 180, // px
    },
  },
  hd: {
    figure: {
      width: {
        normal: 100, // %
        small: 532, // px
      },
    },
    caption: {
      width: 265, // px
    },
  },
}

const Caption = styled.figcaption`
  color: #494949;
  &::after {
    border-color: #d0a67d;
  }

  line-height: 1.36;
  letter-spacing: 0.5px;
  font-weight: normal;
  font-size: 14px;
  margin-bottom: 30px;

  /* border-bottom of caption */
  &::after {
    content: '';
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    border-width: 0 0 1px 0;
    border-style: solid;
  }

  ${mq.tabletAndBelow`
    position: relative;
    margin-left: auto;
    padding: 15px 15px 15px 0;
    &:after {
      width: calc(100% - 15px);
    }
  `}

  ${mq.mobileOnly`
    max-width: ${mockup.mobile.caption.width}px;
  `}

  ${mq.tabletOnly`
    max-width: ${mockup.tablet.caption.width}px;
  `}

  ${mq.desktopAndAbove`
    /* clear float */
    clear: both;

    position: relative;
    float: right;

    &:after {
      width: 100%;
    }
  `}

  ${mq.desktopOnly`
    width: ${mockup.desktop.caption.width}px;
    padding: 15px 0 15px 0;
  `}
  ${mq.hdOnly`
    width: ${mockup.hd.caption.width}px;
    padding: 25px 0 20px 0;
  `}
`

export default {
  Caption,
}
