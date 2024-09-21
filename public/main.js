function deleteJobPost(id) {
    const result = confirm(
        'Are you sure you want to delete this Job Post?'
    );
    if (result) {
        fetch('/deleteJobPost/' + id, {
            method: 'POST',
        }).then((res) => {
            if (res.ok) {
                window.location.href = "/index";
            }
        });
    }
}