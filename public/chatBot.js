// Immediately Invoked fn
(function () {
    const api_Url = "https://client-pilot-ai.vercel.app/api/chat"

    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data-owner-id")

    if (!ownerId) {
        console.log("Owner id not found");
        return;

    }

    const button = document.createElement("div")
    button.innerHTML = "💬"

    Object.assign(button.style, {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "22px",
        boxShadow: "0 16px 36px rgba(79,70,229,0.35)",
        zIndex: "999999",
    })
    document.body.append(button)



    const box = document.createElement("div")
    Object.assign(box.style, {
        position: "fixed",
        bottom: "90px",
        right: "24px",
        width: "360px",
        height: "520px",
        borderRadius: "16px",
        background: "#ffffff",
        // color: "#fff",
        display: "none",
        // alignItems: "center",
        // justifyContent: "center",
        // cursor: "pointer",
        // fontSize: "22px",
        boxShadow: "0 24px 64px rgba(15,23,42,0.24)",
        zIndex: "999999",
        fontFamily: "Inter, system-ui, sans-serif",
        flexDirection: "column",
        overflow: "hidden",

    })
    box.innerHTML = `<div style="
    background:linear-gradient(135deg, #4f46e5, #7c3aed);
    color: #fff;
    padding: 14px 16px;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    "
    >
    <span>Customer Support</span>
    <span id="chat-close" style="cursor:pointer; font-size:24px; line-height:1; opacity:0.9;">×</span>

    </div>


    <div id="chat-messages" style="
    flex:1;
    padding:14px;
    overflow-y:auto;
    background:#f8fafc;
    display:flex;
    flex-direction:column;
    gap:8px;
    "
    ></div>

    <div style="
    display:flex;
    border-top:1px solid #e2e8f0;
    background:#ffffff;
    padding:10px;
    gap:6px;"
    >

    <input id="chat-input" type="text" style="
    flex:1;
    padding:10px 12px;
    border:1px solid #cbd5e1;
    border-radius:10px;
    color:#0f172a;
    font-size:15px;
    outline:none;"
    placeholder="Type a message"/>

    <button id="chat-send" style="padding:10px 16px;
    border:none;
    background:#4f46e5;
    color:#fff;
    border-radius:10px;
    font-size:15px;
    font-weight:600;
    cursor:pointer;
    "
    >Send</button>
    </div>
    `
    document.body.appendChild(box)

    button.onclick = () => {
        box.style.display = box.style.display === "none" ? "flex" : "none"
    }

    document.querySelector("#chat-close").onclick = () => {
        box.style.display = "none"
    }

    const input = document.querySelector("#chat-input")
    const sendBtn = document.querySelector("#chat-send")
    const messageArea = document.querySelector("#chat-messages")

    function addMessage(text, from) {
        const bubble = document.createElement("div")
        bubble.innerHTML = text
        Object.assign(bubble.style, {
            maxWidth: "85%",
            padding: "10px 12px",
            borderRadius: "14px",
            fontSize: "15px",
            lineHeight: "1.55",
            marginBottom: "2px",
            alignSelf: from === "user" ? "flex-end" : "flex-start",
            background: from === "user" ? "#4f46e5" : "#e2e8f0",
            color: from === "user" ? "#ffffff" : "#0f172a",
            borderTopRightRadius: from === "user" ? "4px" : "14px",
            borderTopLeftRadius: from === "user" ? "14px" : "4px",
            whiteSpace: "pre-wrap",
            overflowWrap: "anywhere",
            boxShadow: from === "user"
                ? "0 6px 16px rgba(79,70,229,0.25)"
                : "0 2px 8px rgba(15,23,42,0.08)",
        })
        messageArea.appendChild(bubble)
        messageArea.scrollTop = messageArea.scrollHeight
    }

    sendBtn.onclick = async () => {
        const text = input.value.trim()
        if (!text) {
            return
        }
        addMessage(text, "user")
        input.value = ""

        const typing = document.createElement("div")
        typing.innerHTML = "AI Type kr rha hai..."
        Object.assign(typing.style, {
            fontSize: "12px",
            color: "#64748b",
            marginBottom: "8px",
            alignSelf: "flex-start"
        })
        messageArea.appendChild(typing)
        messageArea.scrollTop = messageArea.scrollHeight


        // try {
        //     const response = await fetch(api_Url, {
        //         method: "POST",
        //         headers: { "content-Type": "application/json" },
        //         body: JSON.stringify({
        //             ownerId,
        //             message: text
        //         })
        //     });

        //     const data = await response.json();
        //     messageArea.removeChild(typing)
        //     addMessage(data.message || "something went wrong", "ai")
        // } catch (error) {
        //     console.log(error);
        //     messageArea.removeChild(typing)
        //     addMessage(data.message || "something went wrong", "ai")
        // }
        try {
            const response = await fetch(api_Url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ownerId,
                    message: text
                })
            });

            const data = await response.json();

            typing.remove();

            addMessage(data.message || "something went wrong", "ai");

        } catch (error) {
            console.log(error);
            typing.remove();
            addMessage("something went wrong", "ai");
        }


    }

    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendBtn.click()
        }
    })


})()
