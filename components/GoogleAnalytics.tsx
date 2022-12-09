import React, { useContext } from 'react'
import Script from 'next/script'
import { AppContext } from '../context/app'
import { Types } from '../context/reducers'

const GoogleAnalytics = () => {
	const { state } = useContext(AppContext)
	return (
		<>
			{state.consent === Types.ConsentAll && (
				<>
					<Script
						strategy='afterInteractive'
						src='https://www.googletagmanager.com/gtag/js?id=G-9FCZ7FEYTX'
					/>
					<Script
						dangerouslySetInnerHTML={{
							__html: `window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());
				gtag('config', 'G-9FCZ7FEYTX', {
				  page_path: window.location.pathname,
				});`,
						}}
					/>
				</>
			)}
		</>
	)
}

export default GoogleAnalytics
