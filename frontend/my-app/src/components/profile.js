
function profile({photo, displayName, age, height, isSmoke, canAlcohol, mbti, major, roles}){
		return(
		<div>
			<img src={photo} alt="profileImg"/>
			<ul>
				<li>이름 : {displayName}</li>
				<li>나이 : {age}</li>
				<li>키 : {height}</li>
				<li>흡연여부 : {isSmoke}</li>
				<li>음주여부 : {canAlcohol}</li>
				<li>MBTI : {mbti}</li>
				<li>전공 : {major}</li>
				<li>직업 : {roles}</li>
			</ul>
		</div>
	);
}
export default profile;