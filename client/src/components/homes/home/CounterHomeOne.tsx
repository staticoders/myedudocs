import Count from "../../common/Count";
import axios from 'axios';
import { useEffect, useState } from 'react'
import url from "../../../url";



interface CounterType {
	id: number;
	count: number;
	symbol?: string;
	title: string;
	icon: string;
}

export default function CounterHomeOne() {

	const [userCount, setUserCount] = useState<number>(0);
	const [teacherCount, setTeacherCount] = useState<number>(0);

	useEffect(() => {
		const fetchCounts = async () => {
			try {
				const [userRes, teacherRes] = await Promise.all([
					axios.get(`${url}/count/getAllStudents`),
					axios.get(`${url}/count/getAllTeachers`),
				]);

				setUserCount(userRes.data.userCount || 0);
				setTeacherCount(teacherRes.data.teacherCount || 0);
			} catch (error) {
				console.error('Error fetching counts:', error);
			}
		};

		fetchCounts();
	}, []);

	const counter_data: CounterType[] = [
		{
			id: 1,
			count: userCount,
			title: 'Our Happy Students',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" fill="#0D5FF9">
  <path d="M32 2L2 16l30 14 22.4-10.467V36h4V18.667L62 16 32 2zM12 26.485V36c0 6.627 8.954 12 20 12s20-5.373 20-12v-9.515l-20 9.348-20-9.348z"/>
</svg>
`, // your SVG
		},
		{
			id: 2,
			count: userCount, // consider changing if it's a different metric
			title: 'Enrolled Learners',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" fill="#0D5FF9">
  <path d="M32 2L2 16l30 14 22.4-10.467V36h4V18.667L62 16 32 2zM12 26.485V36c0 6.627 8.954 12 20 12s20-5.373 20-12v-9.515l-20 9.348-20-9.348z"/>
</svg>
`,
		},
		{
			id: 3,
			count: teacherCount,
			title: 'Expert Instructor',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" fill="#0D5FF9">
  <path d="M48 4H16a4 4 0 00-4 4v24a4 4 0 004 4h32a4 4 0 004-4V8a4 4 0 00-4-4zM16 8h32v24H16V8zm38 36h-2.112a23.992 23.992 0 00-39.776 0H10a2 2 0 000 4h44a2 2 0 000-4zM32 28a6 6 0 100-12 6 6 0 000 12z"/>
</svg>
`,
		},
	];

	return (
		<>
			<section className="counter-up section-padding">
				<div className="container">
					<div className="row">
						<div className="col-12 wow fadeInUp">
							<div className="counter-title text-center">
								<h2>Trusted by <span>Companies</span> Achievements</h2>
							</div>
						</div>
						{counter_data.map((item, i) => (
							<div key={i} className="col-xl-3 col-md-6 col-12 wow fadeIn">
								<div className="counter-item">
									<div className="counterIcon" dangerouslySetInnerHTML={{ __html: item.icon }} >

									</div>
									<h4>
										<Count number={item.count} text={item.symbol} />
									</h4>
									<p>
										{item.title}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
