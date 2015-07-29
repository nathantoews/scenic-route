var React = require('react/addons');
var Classnames = require('classnames');
var Navigate = require('../stores/Navigate.jsx');
var Actions = require('../stores/Actions.jsx');
var ScenicStore = require('../stores/Stores.jsx');

// SECTION FOR TUTORIAL PAGINATION /////////////////////////////////////////////////////////////////

  var Slideshow = React.createClass({
    render: function() {
    return (
      <div className="slideshow">
        <Slides data={this.props.data} />
        <Pagination data={this.props.data} />
        <Controls />
      </div>
    );
  }

});


// Slides
var Slides = React.createClass({
  getInitialState: function(){
    return {
          currentSlide: 0,
      }
  },
  render: function() {
    var slidesNodes = this.props.data.map(function (slideNode, index) {
    var isActive = this.state.currentSlide === index;
      return (
        <Slide active={isActive} key={slideNode.id} imagePath={slideNode.imagePath} imageAlt={slideNode.imageAlt} title={slideNode.title} subtitle={slideNode.subtitle} text={slideNode.text} action={slideNode.action} actionHref={slideNode.actionHref} />
      );
    }.bind(this));
    return (
      <div className="slides">
        {slidesNodes}
      </div>
    );
  }
});

// Single Slide
var Slide = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      'slide': true,
      'slide--active': this.props.active
    });
    return (
      <div className={classes}>
        <img src={this.props.imagePath} alt={this.props.imageAlt} />
        <h2>{this.props.title}</h2>
        <h3>{this.props.subtitle}</h3>
        <p>{this.props.text}</p>
        <a href={this.props.actionHref}>{this.props.action}</a>
      </div>
    );
  }
});

var Controls = React.createClass({
  togglePrev: function() {
    actions.togglePrev();
  },
  toggleNext: function() {
    actions.toggleNext();
  },
  render: function() {
    return (
      <div className="controls">
        <div className="toggle toggle--prev" onClick={this.togglePrev}>Prev</div>
        <div className="toggle toggle--next" onClick={this.toggleNext}>Next</div>
      </div>
    );
  }
});

var actions = {
  toggleNext: function() {
    console.log("something worked");
    var current = this.state.currentSlide;
    var next = current + 1;
    if (next > this.state.data.length - 1) {
      next = 0;
    }
    state.currentSlide = next;
    render(this.state)
  },
  togglePrev: function() {
    console.log("something worked");
    var current = this.state.currentSlide;
    var prev = current - 1;
    if (prev < 0) {
      prev = state.data.length - 1;
    }
    state.currentSlide = prev;
    render(this.state);
  },
  toggleSlide: function(id) {
    console.log("something worked");
    var index = this.state.data.map(function (el) {
      return (
        el.id
      );
    });
    var currentIndex = index.indexOf(id);
    this.state.currentSlide = currentIndex;
    render(this.state);
  }
}

// Pagination
var Pagination = React.createClass({
  render: function() {
    var paginationNodes = this.props.data.map(function (paginationNode, index) {
      return (
        <Pager id={paginationNode.id} key={paginationNode.id} title={paginationNode.title}  />
      );
    });
    return (
      <div className="pagination">
        {paginationNodes}
      </div>
    );
  }
});

var Pager = React.createClass({
  toggleSlide: function() {
    actions.toggleSlide(this.props.id);
  },
  render: function() {
    return (
      <span className="pager" onClick={this.toggleSlide}>{this.props.title}</span>
    );
  }
});

// Slideshow Component

// Render

module.exports = Slideshow;