var React = require('react/addons');
var Classnames = require('classnames');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');
var TutorialSection = require('./Tutorial.jsx');


function readCookie(name) {
    var value = (name = new RegExp('(?:^|;\\s*)' + ('' + name).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') + '=([^;]*)').exec(document.cookie)) && name[1];
    console.log('cookie value', value);
    return (value == null) ? false : decodeURIComponent(value);
}
// SECTION FOR ACCORDION DROP DOWN MENU /////////////////////////////////////////////////////////

var Section = React.createClass({
  handleClick: function(){
    if(this.state.open) {
      this.setState({
        open: false,
        class: "section"
      });
    }else{
      this.setState({
        open: true,
        class: "section open"
      });
    }
  },
  getInitialState: function(){
     return {
       open: false,
       class: "section"
     }
  },
  render: function() {
    return (
      <div className={this.state.class}>
        <button></button>
        <div className="sectionhead" onClick={this.handleClick}>
        	{this.props.title}
        </div>
        <div className="articlewrap">
          <div className="article">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

var Accordion = React.createClass({
  render: function() {
    return (
      <div className="main">
        <div className="staticTitle">{this.props.title}</div>
        <Section title="What data does Greenlane use to map scenic routes?">
        	Greenlane utilizes park, trail and tree coverage data to map out the nicest greenlanes for you to enjoy.
        </Section>
        <Section title="Why are there no parks along my route?">
        	While Greenlane would always like to provide you parks along your journey, they are not always available. Not to worry, Greenlane also incorporates other green elements for you to experience such as trails and tree coverage. Enjoy!
        </Section>
        <Section title="Why do some parks not contain photos?">
        	The photos that we present of parks are pulled from Instagram photos that have been location tagged. Unfortunately, not every park has been geo-located on Instagram. If you wish to be the first, snap a photo of some natural beauty along your greenlane, upload to Instagram & tag your park location.
        </Section>
        <Section title="Can my Instagram photos appear on Greenlane’s park pages?">
        	Yes, if you take a photo along your greenlane and upload to Instagram with your location tagged, you may be featured. Note that the photos are updated monthly, and only a selected quantity of photos are added per month.
        </Section>
        <Section title="Why do I have to sign in to favourite or share a route?">
        	In order for Greenlane to keep track of individual users and their favourite routes, we require users to login.  
        </Section>
        <Section title="What are the parameters in Toronto that Greenlane will create routes?">
			Greenlane will map routes within the following bounds:
			East – Scarborough Pickering Town Line, Including Rouge Park
			West – Dixie Rd, Hwy 407
			North – Steeles Ave
			South – Downtown Toronto, including Toronto Island
        </Section>
        <Section title="Will my greenlane always be a longer route than my regular route?">
        	Not necessarily, some green routes may be equal to or shorter than your everyday route. 
        </Section>
      </div>
    );
  }
});

// STATIC PAGE CONTROLLER //////////////////////////////////////////////////////////

var PageController = React.createClass({
	getInitialState: function(){
		return {
			'activePage': null,
			'saved': [],
			'containerCSS': Classnames(
								'staticPageContainer',
								'hide', 
								ScenicStore.getLayout().containerMask
							),
			 'tutorialData' : [
			  {
			    id         : "slide1",
			    imagePath  : "materialize/img/png/Walkthrough-02.png",
			    imageAlt   : "Slide 1 Image",
			    title      : "Slide 1",
			    subtitle   : "Slide 1 Image SubTitle",
			    text       : "Slide 1 Image Text",
			    action     : "Slide 1 Image Action",
			    actionHref : "href"
			  },
			  {
			    id         : "slide2",
			    imagePath  : "materialize/img/png/Walkthrough-03.png",
			    imageAlt   : "Slide 2 Image",
			    title      : "Sasadasdasdasdasdsdasdasdasdaslide 2",
			    subtitle   : "Slidasdasdasdasdasdasdasdasde 2 Image SubTitle",
			    text       : "Slisadasdasdasdasdasde 2 Image adsdasdasdasdasdasText",
			    action     : "Slide 2 Image Action",
			    actionHref : "href"
			  },
			  {
			    id         : "slide3",
			    imagePath  : "materialize/img/png/Walkthrough-04.png",
			  },
			]
		};
	},

	favSection: function(){
		return (
			<div className="viewContainer">
			<div className="staticTitle">favourited routes</div>
			<div className='favouritedRoute'>
			{	
			    this.state.saved.map(function(route) {
			        var destFav = route.originName + '-' + route.destinationName;
			        var transitType = route.transit == 'cycling' ? <div><div className='bikeGrey'></div>{destFav}</div>: false || route.transit == 'walking' ? <div><div className='walkGrey'></div>{destFav}</div> : false;
			    	console.log('ROUTE', route.originName)
			        return  <Section title={transitType}>

							<div>{route.originName}</div>
							<div>{route.destinationName}</div>
							<div>{route.formatted.duration}</div>
							<div>{route.formatted.distance}</div>
							<div>{route.info.parks}</div>
							<div onClick={Navigate.generateSingleton.bind(this, route)} className="favGo"></div>
							<div className="favDelete"></div>	
							</Section>
			
				})
			}
				</div>
			</div>
		);
	},	
	aboutUs: function(){
		return (
			<div className="viewContainer">
				<h1 className="staticTitle">about</h1>
				<div className="logo"></div>
					<p>	We’re a group of interns at Critical Mass, an experience design agency based in Toronto.</p>
					<p>	Though we all specialize in different areas, the one thing we have in common is our love for our city and the great outdoors.</p>
					<p>	We wanted to create something that used the city’s green spaces to make Torontonians’ lives just a little bit better.  So we got together, thought long and hard and came up with Greenlane - an app that uses park, tree and trail data to map scenic routes through the city.</p>
					<p>	So next time you’re moving through Toronto, choose Greenlane and see the city differently.</p>
				<hr/>
				<h3>the team</h3>
				<div className="theTeam"></div>
			</div>
		);
	},

	FAQ: function(){
		return (
			<Accordion title="frequently asked questions" />		
		);
	},

	privacy: function(){
		return (
			<div className="viewContainer">
				<h1 className="staticTitle">privacy</h1>
				<p>We’re a group of interns at Critical Mass, an experience design agency based in Toronto.</p>
				<p>Though we all specialize in different areas, the one thing we have in common is our love for our city and the great outdoors.</p>
				<p>We wanted to create something that used the city’s green spaces to make Torontonians’ lives just a little bit better. So we got together, thought long and hard and came up with Greenlane - an app that uses park, tree and trail data to map scenic routes through the city.</p>
				<p>	So next time you’re moving through Toronto, choose Greenlane and see the city differently.</p>
			</div>		
		);
	},
	tutorial: function(){
	return (
		<div className="viewContainer">
			<h1 className="staticTitle">tutorial</h1>
			<TutorialSection data={this.state.tutorialData}/>
		</div>		
	);
},	

	componentDidMount: function(){
		window.hrr = this;
		ScenicStore.addChangeListener(this.updateState);

	},
	updateState: function(){
		var containerCSS; 
		if (!ScenicStore.getActivePage()){
			containerCSS = Classnames(
								'staticPageContainer',
								'hide', 
								ScenicStore.getLayout().containerMask
							);
		}
		else{
			containerCSS = Classnames(
								'staticPageContainer', 
								ScenicStore.getLayout().containerMask
							);
		}
		

		console.log(ScenicStore.getActivePage());
		console.log(readCookie('authenticated'));
		if ((ScenicStore.getActivePage() == 'favSection') && readCookie('authenticated')){
			$.get("http://localhost:3000/favourite-routes", {
				authId: parseFloat(readCookie('authId')), 
				type: readCookie('type')
			}, 
			function(res, err){
				console.log(res);
				console.log(err);

				this.setState({'saved': res});

				setTimeout(function(){
					this.setState({
						'activePage': ScenicStore.getActivePage(),
						'containerCSS': containerCSS,
					})					
				}.bind(this), 10)

			}.bind(this));					
		}
		else{
			this.setState({
				'activePage': ScenicStore.getActivePage(),
				'containerCSS': containerCSS,
			})			
		}
	},		
	render: function() {
		return (
		    <div className={this.state.containerCSS}>
		    	{this.state.activePage ? this[this.state.activePage]() : null}
		    </div>
		);
	}
});

module.exports = PageController;

