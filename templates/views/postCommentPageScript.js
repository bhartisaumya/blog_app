console.log("kjsdbf")
        
        // const commentBtn = document.getElementById('comment-btn')
        // commentBtn.addEventListener('click', showComment)

        function showComment() {
            console.log("add comment")
            // Get the comment input value
            var commentInput = document.querySelector('.comment-input');
            var commentText = commentInput.value;

            // Clear the comment input
            commentInput.value = '';

            const noteId = document.notes._id
            console.log(noteId)       

            // fetch("http://localhost:3000/notes/comments/" + noteId,{
            //     method: 'GET'
            // })
            // .then(res => res.json())
            // .then((res) => {
            //     console.log(res)
            // })
            // .catch(error => alert(error.message))

            // // Create a new comment element
            // var newComment = document.createElement('li');
            // newComment.className = 'comment';
            // newComment.textContent = commentText;

            // Append the new comment to the comments list
            //var commentsList = document.getElementById('commentsList');
            //commentsList.appendChild(newComment);
        }

        console.log("kjsdbf");

const commentBtn = window.getElementById('comment-btn');
commentBtn.addEventListener('click', showComment);

function showComment() {
    console.log("add comment");
    // Your fetch and other JavaScript code here
}

var commentInput = document.querySelector('.comment-input');
            var commentText = commentInput.value;

            // Clear the comment input
            commentInput.value = '';

            // Create a new comment element
            var newComment = document.createElement('li');
            newComment.className = 'comment';
            newComment.textContent = commentText;

            // Append the new comment to the comments list
            var commentsList = document.getElementById('commentsList');
            commentsList.appendChild(newComment);