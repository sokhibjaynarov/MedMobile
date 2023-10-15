import React, {useState} from 'react';
import {JitsiMeeting} from '@jitsi/react-sdk';

const JitsimeetingComponents = ({doctorId}) => {
    const [gridApi, setGridApi] = useState()
    return (
        <>
            <JitsiMeeting
                lang={"en"}
                configOverwrite={{
                    startWithAudioMuted: true,
                    startScreenSharing: true,
                    hiddenPremeetingButtons: ['microphone']
                }}

                roomName={doctorId + "this is room id"} // make sure it's a good one!
                getIFrameRef={node => {
                    node.style.width = '800px'
                    node.style.height = '800px'
                }}
                onApiReady={setGridApi}

            />
        </>
    )
}
export default JitsimeetingComponents