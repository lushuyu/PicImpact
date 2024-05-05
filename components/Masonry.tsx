'use client'

import React from 'react'
import { Card, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import { Star, MessageSquareHeart } from 'lucide-react'
import { ImageHandleProps, ImageType } from '~/types'
import PhotoAlbum from 'react-photo-album'
import { Button, Image, Spinner } from '@nextui-org/react'
import { useSWRPageTotalHook } from '~/hooks/useSWRPageTotalHook'
import useSWRInfinite from 'swr/infinite'
import { useButtonStore } from '~/app/providers/button-store-Providers'
import MasonryItem from '~/components/MasonryItem'

export default function Masonry(props : Readonly<ImageHandleProps>) {
  const { data: pageTotal } = useSWRPageTotalHook(props)
  const { data, error, isLoading, isValidating, size, setSize } = useSWRInfinite((index) => {
    return [`client--${index}-${props.tag}`, index]
    },
    ([_, index]) => {
      return props.handle(index + 1, props.tag)
    }, {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    })
  const dataList = data ? [].concat(...data) : [];

  const { setMasonryView, setMasonryViewData } = useButtonStore(
    (state) => state,
  )

  return (
    <div className="w-full sm:w-4/5 mx-auto p-2">
            {/* <Card isBlurred shadow="sm" className="h-48 items-center">
        <CardBody className="flex flex-col space-y-2 ">
          <span className="flex items-center">
          <span className="h-px flex-1 bg-black"></span>
          <span className="pr-6" style={{paddingLeft:"1.5em"}}>为世界上所有的美好而战！</span>
          <span className="h-px flex-1 bg-black"></span>
        </span>

        </CardBody>
      </Card> */}
      <Card shadow="sm"  style={{marginBottom:"1em", fontFamily:"'Noto Serif SC', serif, system-ui"}}>
        <CardHeader className="flex flex-col space-y-2">
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 items-center ">
            <span className="pr-6" style={{paddingLeft:"1.5em", fontSize:"40px"}}>Lu Shuyu's Gallery</span>
              <span className="pr-6" style={{paddingLeft:"1.5em", fontSize:"20px"}}>为世界上所有的美好而战！</span>
          <span className="h-px flex-1 bg-black"></span>
            </div>
          </div>

        </CardHeader>
      </Card>
      <PhotoAlbum
        columns={(containerWidth) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 768) return 2;
          if (containerWidth < 1024) return 3;
          return 4;
        }}
        layout="masonry"
        photos={
          dataList?.map((item: ImageType) => ({
            src: item.preview_url || item.url,
            alt: item.detail,
            ...item
          })) || []
        }
        renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
          <div className="my-2">
            <Image
              className="cursor-pointer transition-all will-change-transform hover:scale-[1.01]"
              src={photo.src}
              alt={photo.alt}
              radius="none"
              loading="lazy"
              isBlurred
              shadow="sm"
              onClick={() => {
                setMasonryView(true)
                setMasonryViewData(photo)
              }}
            />
          </div>
        )}
      />
      <div className="flex items-center justify-center my-4">
        {
          isValidating ?
            <Spinner label="为世界上所有的美好而战！" color="primary" />
            :
          size < pageTotal &&
            <Button
              color="primary"
              variant="bordered"
              isLoading={isLoading}
              onClick={() => {
                setSize(size + 1)
              }}
            >
              加载更多
            </Button>
        }
      </div>
      <MasonryItem />
    </div>
  )
}