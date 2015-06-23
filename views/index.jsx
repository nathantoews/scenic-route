var React = require('react');
var Layout = require('./layout/default');
// var SideNav = require('./layout/SideNav');
var ProfileNav = require('./layout/ProfileNav');


var Body = React.createClass({
    render: function(){
      return (
        <Layout>          
        </Layout>
        <ProfileNav/>
      );
    }
});


module.exports = Body;
// module.exports = SideNav;




// var React = require('react');


// var CommentList = React.createClass({
//     render: function(){

//       var comments = this.props.data.map(function(c){
//         return(
//           <Comment author={c.author}>
//             {c.text}
//           </Comment>
//         );
//       });

//       return (
//           <div className="commentList" data={this.props.data}>
//             {comments}
//           </div>
//       );
//     }
// });

// var Comment = React.createClass({
//     render: function(){
//       var raw = this.props.children.toString();
//       return (
//           <div className="comment">
//             <h2 className="commentAuthor">
//               {this.props.author}
//             </h2>
//             <span dangerouslySetInnerHTML={{__html: raw}} />
//           </div>
//       );
//     }
// });

