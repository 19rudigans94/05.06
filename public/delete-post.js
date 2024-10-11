const postContainer = document.querySelector(".postContainer");


postContainer.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".deletePost");
    const viewBtn = event.target.closest(".viewPost");

    if (deleteBtn) {
        const id = deleteBtn.dataset.id;
        fetch(`/api/posts/${id}`, {
            method: "DELETE"
        }).then(() => {
            location.reload();
        });
    }
    if (viewBtn) {
        const id = viewBtn.dataset.id;
        fetch(`/api/post/?id=${id}`, {
            method: "GET"
        })
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }
});