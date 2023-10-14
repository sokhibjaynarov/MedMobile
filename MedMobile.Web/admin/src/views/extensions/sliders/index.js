import {Fragment} from 'react'
import {Col, Row} from 'reactstrap'
import SliderColors from './SliderColors'
import SliderValues from './SliderValues'
import SliderVertical from './SliderVertical'
import SliderBehaviour from './SliderBehaviour'
import SliderScalePips from './SliderScalePips'
import SliderWithInput from './SliderWithInput'
import SliderBootstrap from './SlidersBootstrap'
import SliderConnectUpper from './SliderConnectUpper'
import SliderVerticalLimit from './SliderVerticalLimit'
import SliderVerticalTooltip from './SliderVerticalTooltips'
import ExtensionsHeader from '@components/extensions-header'

// ** Styles
import '@styles/react/libs/noui-slider/noui-slider.scss'

const Slider = () => {
    return (
        <Fragment>
            <ExtensionsHeader
                title='Noui Slider'
                subTitle='noUiSlider is a lightweight JavaScript range slider.'
                link='https://github.com/mmarkelov/react-nouislider'
            />

            <Row>
                <Col sm='12'>
                    <SliderBootstrap/>
                </Col>
                <Col sm='12'>
                    <SliderValues/>
                </Col>
                <Col sm='12'>
                    <SliderBehaviour/>
                </Col>
                <Col sm='12'>
                    <SliderScalePips/>
                </Col>
                <Col sm='12'>
                    <SliderColors/>
                </Col>
                <Col sm='12'>
                    <SliderWithInput/>
                </Col>
            </Row>
            <Row>
                <Col lg='3' md='6' sm='12'>
                    <SliderVertical/>
                </Col>
                <Col lg='3' md='6' sm='12'>
                    <SliderConnectUpper/>
                </Col>
                <Col lg='3' md='6' sm='12'>
                    <SliderVerticalTooltip/>
                </Col>
                <Col lg='3' md='6' sm='12'>
                    <SliderVerticalLimit/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Slider
