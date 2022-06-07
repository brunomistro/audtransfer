import { useEffect, useState } from "react";
import { useDeezerContext } from "../contexts/Deezer"
import { Link } from "react-router-dom";

export default function DeezerPage() {
	const { setAccessToken } = useDeezerContext();
	const [importFlag, setImportFlag] = useState(null);
	const [exportFlag, setExportFlag] = useState(null);
	const dataTransfer = sessionStorage.getItem('playlisToTransfer');

	const handleLogin = () => { window.location = "http://localhost:5000/loginDeezer" }

	//DEEZER ACCESS
	const { access_token } = getHashParams();
	function getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
				q = window.location.hash.substring(1);
		while ( (e = r.exec(q))) {
			 hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	useEffect(() => {
		if(!access_token) return
		setAccessToken(access_token)

		if(dataTransfer){
			setExportFlag(false)
			setImportFlag(true)
		}
		else{
			setExportFlag(true)
			setImportFlag(false)
		}
	}, [access_token, setAccessToken, setExportFlag, setImportFlag, dataTransfer])
	

	return (
		<div className="page">
			{!access_token && (<button onClick={handleLogin}>Login to Deezer</button>)}
			<>
			{exportFlag && (
					<Link to="/deezer/export">
						<button>Start Export</button>
					</Link>
				)}
				{importFlag && (
					<Link to="/deezer/import">
						<button>Start Import</button>
					</Link>
				)}
			</>
		</div>
	)
}
