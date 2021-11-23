import {useState, useEffect} from 'react';
import styles from'./form.module.css';
function FormOfMydata(){
	const [yourInfo, setYourInfo] = useState({
		"displayName": "",
		"roles": "",
		"age": 0,
  		"mbti": "",
  		"major": "",
  		"canAlcohol": false,
  		"isSmoke": false,
  		"height": 0
	});
	const {displayName, major, roles, age, mbti, canAlcohol, isSmoke, height} =yourInfo;
	const onChange=(event)=>{
		const {name, value} = event.target;
		const nextInputs={
			...yourInfo, [name] : value,
		}
		setYourInfo(nextInputs);
	}
	const onSubmit =(event)=>{
		event.preventDefault();
		console.log(yourInfo);
	}
	return (
		<div className={styles.container}>
			<form onSubmit={onSubmit} className={styles.form}>
				<div className={styles.formGroup}>
					<label htmlFor="displayName">이름</label>
					<input id="displayName" className={styles.formInput} 
						name='displayName' value={displayName} onChange={onChange} type='text' placeholder="이름을 입력하시오"/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="age">나이</label>
					<input id="age"name='age' value={age} className={styles.formInput}
						onChange={onChange} type='number' placeholder="나이를 입력하세요"/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="height">키</label>
						<input name='height' value={height} className={styles.formInput}
							onChange={onChange} type='number' placeholder="나이를 입력하세요"/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="roles">직업</label>
					<select name='roles' id="roles" className={styles.formInput}
						onChange={onChange} value={roles}>
						<option value=''>-- 직업 선택 --</option>
  						<option value="무직">무직</option>    
     					<option value="학생">학생</option>    
     					<option value="컴퓨터/인터넷">컴퓨터/인터넷</option>
     					<option value="언론">언론</option>    
     					<option value="공무원">공무원</option>    
     					<option value="군인">군인</option>    
     					<option value="서비스업">서비스업</option>    
     					<option value="교육">교육</option>    
     					<option value="금융/증권/보험업">금융/증권/보험업</option>    
     					<option value="유통업">유통업</option>    
     					<option value="예술">예술</option>    
     					<option value="의료">의료</option>    
     					<option value="법률">법률</option>    
     					<option value="건설업">건설업</option>    
     					<option value="제조업">제조업</option>    
     					<option value="부동산업">부동산업</option>    
     					<option value="운송업">운송업</option>    
     					<option value="농/수/임/광산업">농/수/임/광산업</option>    
     					<option value="가사">가사</option>    
     					<option value="기타">기타</option>
					</select>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="major">학과</label>
					<input id="major" name='major' value={major} className={styles.formInput}
						onChange={onChange} type='text' placeholder="학과를 입력하세요"/>
				</div>
				<div className={styles.formGroup}>
					<label htmlFor="mbti">MBTI</label>
					<select name='mbti'id="mbti" className={styles.formInput} onChange={onChange} value={mbti}>
						<option value=''>-- MBTI 선택 --</option>
  						<option value="ISTJ">ISTJ</option>    
     					<option value="ISFJ">ISFJ</option>
						<option value="INFJ">INFJ</option>    
     					<option value="INTJ">INTJ</option>
						<option value="ISTP">ISTJ</option>
						<option value="ISFP">ISFP</option>
						<option value="INFP">INFP</option>
						<option value="INTP">INTP</option>
						<option value="ESTP">ESTP</option>
						<option value="ESFP">ESFP</option>
						<option value="ENFP">ENFP</option>
						<option value="ENTP">ENTP</option>
						<option value="ESTJ">ESTJ</option>
						<option value="ESFJ">ESFJ</option>
						<option value="ENFJ">ENFJ</option>
						<option value="ENTJ">ENTJ</option>
						<option value="기타">기타</option>
					</select>
				</div>
				<div className={styles.formGroup}>
					<p>흡연 여부</p>
					<label>
        				<input className={styles.inputRadio} id="isSmoke" 
							onChange={onChange} name="isSmoke" value={true} type="radio"/>O
					</label>
					<label>
        				<input className={styles.inputRadio}id="isSmoke" 
						onChange={onChange}	name="isSmoke" value={false}type="radio"/>X
					</label>
				</div>
				<div className={styles.formGroup}>
					<p>음주 여부</p>
					<label>
        				<input className={styles.inputRadio} id="canAlcohol" 
						onChange={onChange}	name="canAlcohol" value={true} type="radio"/>O
					</label>
					<label>
        				<input className={styles.inputRadio} id="canAlcohol" 
						onChange={onChange}	name="canAlcohol"value={false} type="radio"/>X
					</label>
				</div>
				<div className={styles.formGroup}>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	);
}
export default FormOfMydata;