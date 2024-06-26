import VaulDrawer from '~/components/layout/VaulDrawer'
import { DropMenu } from '~/components/layout/DropMenu'
import DynamicDropMenu from '~/components/layout/DynamicDropMenu'
import { fetchTagsShow } from '~/server/lib/query'
import { HandleProps } from '~/types'

export default async function DynamicNavbar() {
  const getData = async () => {
    'use server'
    return await fetchTagsShow()
  }

  const props: HandleProps = {
    handle: getData,
    args: 'headerLink',
  }

  return (
    <>
      <div className="flex mx-2 sm:hidden">
        <DynamicDropMenu {...props} />
      </div>
      <div className="flex sm:hidden">
        <VaulDrawer/>
      </div>
      <div className="hidden sm:flex space-x-2">
        <DropMenu/>
      </div>
    </>
  )
}