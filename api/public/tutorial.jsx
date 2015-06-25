// tutorial1.js
// Higher Level Architecutre
// - CommentBox
//   - CommentList
//     - Comment
//   - CommentForm

window.data = (window.data && window.data.length) ? window.data : [
  {
    "author": "Pete Hunt",
    "text":"This is Pete's comment"
  },
  {
    "author": "Andrew Louis",
    "text":"This is Andrew's comment"
  }
];

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
        this.setState({data: window.data});
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
  },
  handleCommentSubmit: function(comment){
    window.data.push(comment);
    // change state here to prompt a re-render.
    this.setState({data:data});
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});

var CommentForm = React.createClass({
    handleSubmit: function(e){
      e.preventDefault();
      var author = React.findDOMNode(this.refs.author).value.trim();
      var text = React.findDOMNode(this.refs.text).value.trim();

      if (!text || !author){
        return;
      }
      this.props.onCommentSubmit({author: author, text:text});
      // TODO: Send request to the server.
      React.findDOMNode(this.refs.author).value = '';
      React.findDOMNode(this.refs.text).value = '';
      return;
    },
    render: function(){
      return (
          <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Your name" ref="author" />
            <input type="text" placeholder="Say something..." ref="text"/>
            <input type="submit" value="Post" />
          </form>
      );
    }
});

var CommentList = React.createClass({
    render: function(){

      var comments = this.props.data.map(function(c){
        return(
          <Comment author={c.author}>
            {c.text}
          </Comment>
        );
      });

      return (
          <div className="commentList" data={this.props.data}>
            {comments}
          </div>
      );
    }
});

var Comment = React.createClass({
    render: function(){
      var raw = marked(this.props.children.toString(),{sanitize:true});
      return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
            <span dangerouslySetInnerHTML={{__html: raw}} />
          </div>
      );
    }
});

React.render(
    <CommentBox data={data}/>,
    document.getElementById('content')
);
