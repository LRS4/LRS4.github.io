class GitGraphFactory {
	constructor() { 
		this.$graphBtn = $('#graphBtn');
	}

	/**
	 * Creates a gitgraph in the target element with achievements and skills for job history.
	 * @see http://diydeveloper.io/post/2019-09-18-make-great-git-diagrams/
	 * @param {string} elementId The html id selector for the canvas.
	 * @param {array} branchNames An array holding two names for each of the branches off master.
	 * @param {string} jobTitle A string of the job position name.
	 * @param {array} achievements An array holding three achievements from the position.
	 * @param {array} skills An array holding three technical skills gained from the position.
	 * @return {object} Creates new GitgraphJS object.
	 */
	createGraph(elementId, branchNames, jobTitle, achievements, skills) {
		// Populate Job History Graph
		var graphContainer = document.getElementById(elementId);

		const gitTemplate = GitgraphJS.templateExtend(GitgraphJS.TemplateName.Metro, {
			//colors: ['#999999', '#008FB5', '#F1C109'],
			colors: ['black', '#666666', '#008FB5'],
			commit: {
				message: {
					displayAuthor: false,
					displayHash: false
				},
			},
			branch: {
				lineWidth: 8
			}
		});

		var gitgraph = GitgraphJS.createGitgraph(graphContainer, {
			template: gitTemplate
		});

		// Simulate git commands with Gitgraph API.
		// 2016 Information Systems Officer
		var master = gitgraph.branch("master");
		master.commit({
			subject: "Initial commit",
			tag: jobTitle
		});

		master.commit(achievements[0])

		var develop = gitgraph.branch(branchNames[0]);
		develop.commit(achievements[1]);
		develop.commit(achievements[2])

		var aFeature = gitgraph.branch(branchNames[1]);
		aFeature
			.commit(skills[0])
			.commit(skills[1])
			.commit(skills[2]);

		develop.merge(aFeature, [achievements[3]]);
		develop.commit(achievements[4]);

		master.merge(develop);
	}

	/**
	 * Shows the gitgraph when the user clicks History button.
	 */
	showGitGraphSection() {
		this.$graphBtn.click(() => {
			$('.row').hide();
			$('#gitgraph, #gitgraphTwo, #gitgraphThree').html("");
			this.createGraph("gitgraph", ['achievements', 'skills'], "2015 - Information Systems Officer", [
				'Developed ICT system configurations and for defined processes.',
				"Maintained and developed a range of different systems.",
				"Used statistical methods to analyse customer trends.",
				"Carried out user research to improve systems design.",
				'Configured inputs including process maps, business rules, triggers, SLA’s, and data sources'
			], [
				'Business Analysis', 'Systems Development', 'SQL Databases'
			]);
			this.createGraph("gitgraphTwo", ['achievements', 'skills'], "2017 - Frontend Web Developer", [
				'Contributed to development of an enterprise scale website.',
				"Implemented user interface for the company's online CRM system.",
				'Used Agile methods to deliver product backlog items.',
				'Integrated website to other systems and databases',
				'Built and maintained online web forms for data capture and case management'
			], [
				'HTML, CSS and JavaScript', 'jQuery and AJAX', 'Git and API Integration'
			]);
			this.createGraph("gitgraphThree", ['achievements', 'skills'], "2019 - Data Scientist", [
				'Automated processes to reduce repetition and costs alongside increasing efficiency.',
				'Utilised machine learning and statistical techniques to create accurate funding models.',
				'Created complex systems, dashboards, tools, bots and web apps to increase productivity.',
				'Produced in-depth analysis and modelling for data-driven decision making.',
				'Worked on high profile projects that had significant impact.'
			], [
				'Python, Machine Learning and RPA',
				'C#, ASP.NET Core, Azure and T-SQL',
				'Statistical Analysis with R and Power BI'
			])
			$('.graphArea').show();
			$('#subtitle').text('Developer Job History');
		});
	}
}

export default GitGraphFactory;