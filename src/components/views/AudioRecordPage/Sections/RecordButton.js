import React, { Fragment, useState } from 'react';
// import MicIcon from '@material-ui/icons/Mic';
// import StopIcon from '@material-ui/icons/Stop';
// import Fab from '@material-ui/core/Fab';
// import Tooltip from '@material-ui/core/Tooltip';
import styled from 'styled-components';

// const StyledFab = styled(Fab)`
// 	position: relative;
// 	background-color: ${(props) => (props.recording ? '#272727' : '#ff3466')};
// 	color: white;
// 	opacity: 1;
// 	margin: 12px;
// 	transition: all 0.2s;
// 	.pulse-bg {
// 		position: absolute;
// 		width: 100%;
// 		height: 100%;
// 		background-color: #ff3466;
// 		border-radius: 100%;
// 		opacity: 0.5;
// 		z-index: -10;
// 		animation: pulse 1s ease-out infinite;
// 	}
// 	:hover {
// 		background-color: ${(props) => (props.recording ? '#272727' : '#ff3466')};
// 		opacity: 0.9;
// 	}
// 	@keyframes pulse {
// 		0% {
// 			transform: scale(1, 1);
// 		}
// 		50% {
// 			opacity: 0.3;
// 		}
// 		100% {
// 			transform: scale(1.5);
// 			opacity: 0;
// 		}
// 	}
// `;

export default function RecordButton(props) {
	const [isRecording, setIsRecording] = useState(false);

	return (
		<Fragment>
			
			{/*<!-- <Tooltip title="Stop Recording" aria-label="record" placement="right">
					<StyledFab
						onClick={() => {
							setIsRecording(!isRecording);
							props?.onClick();
							
						}}
						color="secondary"
						aria-label="record"
					>
						<div className="pulse-bg" />
						<StopIcon />
					</StyledFab>
				</Tooltip> -->*/}
			
		</Fragment>
	);
}