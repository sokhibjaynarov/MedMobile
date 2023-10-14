// ** React Imports
import { Fragment } from 'react'

// ** Third Party Components
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.tj'

// ** Reactstrap Components
import { InputGroup, InputGroupText, Label } from 'reactstrap'

const PhoneMask = () => {
  const options = { phone: true, phoneRegionCode: 'TJ' }
  return (
    <Fragment>
      <Label for='phone-number'>Phone Number</Label>
      <InputGroup className='input-group-merge'>
        <InputGroupText>+998</InputGroupText>
        <Cleave className='form-control' placeholder='99 324 9477' options={options} id='phone-number' />
      </InputGroup>
    </Fragment>
  )
}

export default PhoneMask
