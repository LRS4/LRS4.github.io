$(document).ready(function () {

	// set copyright to current year
	let d = new Date();
	let year = d.getFullYear();
	$("footer").html("Copyright &copy; " + year + " Lewis Spencer");

	// function to detect a touch enabled device
	function is_touch_device() {
		return (('ontouchstart' in window)
			|| (navigator.MaxTouchPoints > 0)
			|| (navigator.msMaxTouchPoints > 0));
	}

	// on click of content class, if touch enabled device, display overlay class
	$(".content").click(function (event) {
		if (is_touch_device()) {
			// reset all the others to hide
			$(".overlay").css("opacity", "0");

			// closest overlay class to target change opacity to 1
			$(event.target).closest('.overlay').css("opacity", "1");
		}
	});

	// script for grid image tiles
	filterSelection("all");
	function filterSelection(c) {
		var x, i;
		x = document.getElementsByClassName("column");
		if (c == "all") c = "";
		for (i = 0; i < x.length; i++) {
			w3RemoveClass(x[i], "show");
			if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
		}
	}

	// Filter images
	$(".btn").click((event) => {
		let filter = event.target.id;
		filterSelection(filter);
	});

	function w3AddClass(element, name) {
		var i, arr1, arr2;
		arr1 = element.className.split(" ");
		arr2 = name.split(" ");
		for (i = 0; i < arr2.length; i++) {
			if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
		}
	}

	function w3RemoveClass(element, name) {
		var i, arr1, arr2;
		arr1 = element.className.split(" ");
		arr2 = name.split(" ");
		for (i = 0; i < arr2.length; i++) {
			while (arr1.indexOf(arr2[i]) > -1) {
				arr1.splice(arr1.indexOf(arr2[i]), 1);
			}
		}
		element.className = arr1.join(" ");
	}


	// Add active class to the current button (highlight it)
	var btncontent = document.getElementById("myBtncontent");
	var btns = btncontent.getElementsByClassName("btn");
	for (var i = 0; i < btns.length; i++) {
		btns[i].addEventListener("click", function () {
			$('.graphArea').hide();
			$('#subtitle').text('Skills and Experience');
			$('.row').show();
			var current = document.getElementsByClassName("active");
			current[0].className = current[0].className.replace(" active", "");
			this.className += " active";
		});
	}

	// script for model

	// Get the modal element
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");
	var $graphBtn = $('#graphBtn');

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal, show text
	btn.onclick = function () {
		modal.style.display = "block";
	}

	// When user clicks History, show gitgraph, hide icons
	$graphBtn.click(() => {
		$('.row').hide();
		$('#gitgraph, #gitgraphTwo, #gitgraphThree').html("");
		createGraph("gitgraph", ['achievements', 'skills'], "2015 - Information Systems Officer", [
			'Developed ICT system configurations and for defined processes.',
			"Maintained and developed a range of different systems.",
			"Used statistical methods to analyse customer trends.",
			"Carried out user research to improve systems design.",
			'Configured inputs including process maps, business rules, triggers, SLA’s, and data sources'
		], [
			'Business Analysis', 'Systems Development', 'SQL Databases'
		]);
		createGraph("gitgraphTwo", ['achievements', 'skills'], "2017 - Frontend Web Developer", [
			'Contributed to development of an enterprise scale website.',
			"Implemented user interface for the company's online CRM system.",
			'Used Agile methods to deliver product backlog items.',
			'Integrated website to other systems and databases',
			'Built and maintained online web forms for data capture and case management'
		], [
			'HTML, CSS and JavaScript', 'jQuery and AJAX', 'Git and API Integration'
		]);
		createGraph("gitgraphThree", ['achievements', 'skills'], "2019 - Data Scientist", [
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

	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

	/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
	function myFunction() {
		var x = document.getElementById("myTopnav");
		if (x.className === "topnav") {
			x.className += " responsive";
		} else {
			x.className = "topnav";
		}
	}
});