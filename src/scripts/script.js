import DateSetter from './datesetter';
import DeviceHandler from './device';
import ButtonEvents from './buttons';
import Modal from './modal';
import GridEventsHandler from './gridevents';
import GitGraphFactory from './gitgraph';
import Messages from './messages';

$(document).ready(function () {
	const deviceHandler = new DeviceHandler();
	const buttonEvents = new ButtonEvents();
	const modal = new Modal();
	const gridEvents = new GridEventsHandler();
	const gitGraph = new GitGraphFactory();

	Messages.startIntroJS();
	
	DateSetter.setCopyrightToCurrentYear();
	deviceHandler.startTouchListener();
	modal.addEventListeners();
	gridEvents.filterSelection("all");
	gridEvents.startImageFilterListener();
	buttonEvents.addActiveClassToSelectedButton();
	gitGraph.showGitGraphSection();

	Messages.confirmStarted();
});