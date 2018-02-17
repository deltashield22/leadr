(function handleScrolling() {

    let id = "123bd54c"

    //First add \ as an escape character
    const cleanId = ("#\\" + hexString(id))

    //a function to hex the number at the beginning of the id, which is the same as
    //the unicode for that number. The function returns this attached to a space and
    //the rest of the id.
    function hexString(string) {
        let newStr = string.charCodeAt(0).toString(16)
        let spaceStr = newStr + " " + string.substr(1)

        return spaceStr;
    }

    // The id is now CSS compatible
    const cleanQuery = document.querySelector(cleanId)
})()