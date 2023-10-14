// ** Reactstrap Imports
import {Fragment, useContext} from 'react'

// ** Reactstrap Components
import {Col, Row} from 'reactstrap'

// ** Custom Hooks
import {useRTL} from '@hooks/useRTL'

// ** Demo Components
import RatingBasic from './RatingBasic'
import RatingSizes from './RatingSizes'
import RatingEvents from './RatingEvents'
import RatingNumbers from './RatingNumbers'
import RatingReadOnly from './RatingReadOnly'
import RatingCustomSvg from './RatingCustomSvg'
import RatingFractional from './RatingFractional'
import RatingControlled from './RatingControlled'

// ** Custom Header
import ExtensionsHeader from '@components/extensions-header'

// ** Context
import {ThemeColors} from '@src/utility/context/ThemeColors'

const Rating = () => {
    // ** Hooks
    const [isRtl] = useRTL()

    // ** Context
    const themeColors = useContext(ThemeColors)

    return (
        <Fragment>
            <ExtensionsHeader
                title='React Rating'
                subTitle='A rating react component with custom symbols'
                link='https://github.com/dreyescat/react-rating'
            />
            <Row className='match-height'>
                <Col lg={6} xs={12}>
                    <RatingBasic filledColor={themeColors.colors.warning.main}/>
                </Col>
                <Col lg={6} xs={12}>
                    <RatingReadOnly filledColor={themeColors.colors.warning.main}/>
                </Col>
                <Col lg={6} xs={12}>
                    <RatingFractional filledColor={themeColors.colors.warning.main}/>
                </Col>
                <Col lg={6} xs={12}>
                    <RatingCustomSvg filledColor={themeColors.colors.warning.main}/>
                </Col>
                <Col lg={6} xs={12}>
                    <RatingNumbers filledColor={themeColors.colors.warning.main}/>
                </Col>
                <Col lg={6} xs={12}>
                    <RatingEvents filledColor={themeColors.colors.warning.main}/>
                </Col>
                <Col lg={6} xs={12}>
                    <RatingControlled filledColor={themeColors.colors.warning.main}/>
                </Col>
                <Col lg={6} xs={12}>
                    <RatingSizes filledColor={themeColors.colors.warning.main}/>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Rating
