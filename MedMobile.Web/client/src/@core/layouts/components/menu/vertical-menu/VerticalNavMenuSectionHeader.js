// ** Third Party Components
import { MoreHorizontal } from 'react-feather'
import { useTranslation } from 'react-i18next'
const VerticalNavMenuSectionHeader = ({ item }) => {
  const { t } = useTranslation()
  return (
    <li className='navigation-header'>
      <span>{t(item.header)}</span>
      <MoreHorizontal className='feather-more-horizontal' />
    </li>
  )
}

export default VerticalNavMenuSectionHeader
