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

function createGraph(elementId, branchNames, jobTitle, achievements, skills) {
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