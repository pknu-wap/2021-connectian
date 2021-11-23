import {useState, useEffect} from 'react';
import styles from "./ProfilePage.module.css";

const User=[{
	"displayName": "강우람",
  	"email": "string",
  	"googleId": "string",
  	"photo": "https://ifh.cc/g/VMGYDc.jpg",
  	"roles": "학생",
  	"chats": {
    	"recentRoom": "string",
    "rooms": "{ $roomId: true, ... }"
  	},
	"detail" : {"age": 24,
  	"purpose": "string",
  	"mbti": "ENFJ",
  	"major": "국어국문학과",
  	"canAlcohol": false,
  	"isSmoke": true,
  	"height": 180
			   }
}
	,
	{
		"displayName": "안아롱",
		"email": "string",
  		"googleId": "string",
  		"photo": "https://ifh.cc/g/VMGYDc.jpg",
  		"roles": "학생",
  		"chats": {
   		"recentRoom": "string",
   		"rooms": "{ $roomId: true, ... }"
  		},
		"detail" : {"age": 25,
  		"purpose": "string",
  		"mbti": "INFP",
  		"major": "수학과",
  		"canAlcohol": false,
  		"isSmoke": true,
  		"height": 168
		}
	}
];


function ProfilePage(){
	const [user, getUser] = useState([]);
	useEffect(()=>{
		getUser(User);
	},[])
	return(
		<div className={styles.profilePage}>
			{user.map((user, index)=>(
				<div key={index} className={styles.profile}>
					<img src={user.photo} alt="profileImg"/>
					<ul>
						<li>이름 : {user.displayName}</li>
						<li>나이 : {user.detail.age}</li>
						<li>키 : {user.detail.height}</li>
						<li>흡연여부 : {user.detail.isSmoke ? <span>O</span> : <span>X</span>}</li>
						<li>음주여부 : {user.detail.canAlcohol? <span>O</span> : <span>X</span>}</li>
						<li>MBTI : {user.detail.mbti}</li>
						<li>전공 : {user.detail.major}</li>
						<li>직업 : {user.roles}</li>
					</ul>
				</div>
			))}
		</div>
	);
}

export default ProfilePage;