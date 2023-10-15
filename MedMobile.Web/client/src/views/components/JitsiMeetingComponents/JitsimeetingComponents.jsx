import React from 'react';
import {JitsiMeeting} from '@jitsi/react-sdk';

const JitsimeetingComponents = ({doctorId}) => {
    return (
        <>
            <JitsiMeeting
                lang={"en"}
                configOverwrite={{
                    startWithAudioMuted: true,
                    startScreenSharing: true,
                    hiddenPremeetingButtons: ['microphone']
                }}

                roomName={doctorId+"this is room id"} // make sure it's a good one!
                getIFrameRef={node => {
                    node.style.width = '800px'
                    node.style.height = '800px'
                }}
                onApiReady={(externalApi) => {
                    // here you can attach custom event listeners to the Jitsi Meet External API
                    // you can also store it locally to execute commands
                }}

            />
        </>
    )
}
export default JitsimeetingComponents