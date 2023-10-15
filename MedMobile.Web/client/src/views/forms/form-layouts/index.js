// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Demo Components
import VerticalForm from './VerticalForm'
import VerticalFormIcons from './VerticalFormIcons'
import MultipleColumnForm from './MultipleColumnForm'

const FormLayouts = () => {
  return (
    <Fragment>
      <Breadcrumbs title='Form Layouts' data={[{ title: 'Form' }, { title: 'Form Layouts' }]} />
      <Row>
        <Col md='6' sm='12'>
          <VerticalForm />
        </Col>
        <Col md='6' sm='12'>
          <VerticalFormIcons />
        </Col>
        <Col sm='12'>
          <MultipleColumnForm />
        </Col>
      </Row>
    </Fragment>
  )
}
export default FormLayouts
