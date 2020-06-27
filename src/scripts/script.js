import DateSetter from './datesetter';
import DeviceHandler from './device';
import ButtonEvents from './buttons';
import Modal from './modal';
import GridEventsHandler from './gridevents';
import GitGraphFactory from './gitgraph';
import Messages from './messages';
import ForceDirectedChart from './visual';

$(document).ready(function () {
	const deviceHandler = new DeviceHandler();
	const buttonEvents = new ButtonEvents();
	const modal = new Modal();
	const gridEvents = new GridEventsHandler();
	const gitGraph = new GitGraphFactory();
	
	Messages.startIntroJS();
	
	DateSetter.setCopyrightToCurrentYear();
	deviceHandler.startTouchListener();
	deviceHandler.addExpandMobileNavListener();
	modal.addEventListeners();
	gridEvents.filterSelection("all");
	gridEvents.startImageFilterListener();
	buttonEvents.addActiveClassToSelectedButton();
	gitGraph.showGitGraphSection();
	ForceDirectedChart.createChart();

	Messages.confirmStarted();
});