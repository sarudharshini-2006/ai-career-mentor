// =====================================================
// AI CAREER MENTOR - COMPLETE SCRIPT.JS
// =====================================================


// =====================================================
// API BASE URL
// =====================================================

const API_BASE_URL = "http://localhost:8082";


// =====================================================
// COMMON HELPER FUNCTIONS
// =====================================================

function escapeHtml(text) {

    if (text === null || text === undefined) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =====================================================
// DISPLAY AI RESULT
// =====================================================

function displayAIResult(elementId, data) {

    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    if (typeof marked !== "undefined") {

        element.innerHTML = marked.parse(String(data));

    } else {

        element.innerHTML =
            "<pre>" +
            escapeHtml(data) +
            "</pre>";
    }
}


// =====================================================
// LOADING
// =====================================================

function showLoading(elementId, message) {

    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    element.innerHTML = `
        <div class="loading-message">
            🤖 ${escapeHtml(message)}
            <br><br>
            Please wait...
        </div>
    `;
}


// =====================================================
// ERROR
// =====================================================

function showError(elementId, error) {

    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    const message =
        error && error.message
            ? error.message
            : "Unknown error";

    element.innerHTML = `
        <div class="error-message">
            ❌ Something went wrong.
            <br><br>
            ${escapeHtml(message)}
            <br><br>
            Please check whether Spring Boot is running.
        </div>
    `;
}


// =====================================================
// SCROLL
// =====================================================

function scrollToSection(id) {

    const element = document.getElementById(id);

    if (element) {

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
}


// =====================================================
// HOME
// =====================================================

function scrollToChat() {

    scrollToSection("chat");

}


// =====================================================
// AI CAREER CHAT
// =====================================================

async function askQuestion() {

    const input = document.getElementById("question");

    if (!input) {
        return;
    }

    const question = input.value.trim();

    if (!question) {

        alert("Please enter your question.");

        input.focus();

        return;
    }

    showLoading(
        "answer",
        "AI is thinking about your career question..."
    );

    try {

        const params = new URLSearchParams();

        params.append("question", question);

        const response = await fetch(
            `${API_BASE_URL}/career?${params.toString()}`
        );

        if (!response.ok) {

            throw new Error(
                "Server error: " + response.status
            );
        }

        const data = await response.text();

        displayAIResult(
            "answer",
            data
        );

    } catch (error) {

        console.error(
            "Career Chat Error:",
            error
        );

        showError(
            "answer",
            error
        );
    }
}


// =====================================================
// ENTER KEY FOR CHAT
// =====================================================

function handleQuestionKey(event) {

    if (event.key === "Enter") {

        askQuestion();

    }
}


// =====================================================
// CAREER RECOMMENDATION
// =====================================================

async function getRecommendation() {

    const skillsElement =
        document.getElementById("skills");

    const interestsElement =
        document.getElementById("interests");

    const educationElement =
        document.getElementById("goals");


    if (!skillsElement ||
        !interestsElement ||
        !educationElement) {

        return;
    }


    const skills =
        skillsElement.value.trim();

    const interests =
        interestsElement.value.trim();

    const education =
        educationElement.value.trim();


    if (!skills ||
        !interests ||
        !education) {

        alert(
            "Please enter skills, interests and education."
        );

        return;
    }


    showLoading(
        "recommendationResult",
        "AI is generating your career recommendation..."
    );


    try {

        const params =
            new URLSearchParams();

        params.append(
            "skills",
            skills
        );

        params.append(
            "interests",
            interests
        );

        params.append(
            "education",
            education
        );


        const response =
            await fetch(
                `${API_BASE_URL}/career-recommendation?${params.toString()}`
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        displayAIResult(
            "recommendationResult",
            data
        );


    } catch (error) {

        console.error(
            "Recommendation Error:",
            error
        );

        showError(
            "recommendationResult",
            error
        );
    }
}


// =====================================================
// ROADMAP
// =====================================================

async function generateRoadmap() {

    const careerElement =
        document.getElementById("careerGoal");


    if (!careerElement) {
        return;
    }


    const career =
        careerElement.value.trim();


    if (!career) {

        alert(
            "Please enter your target career."
        );

        return;
    }


    showLoading(
        "roadmapResult",
        "AI is creating your learning roadmap..."
    );


    try {

        const params =
            new URLSearchParams();

        params.append(
            "career",
            career
        );


        const response =
            await fetch(
                `${API_BASE_URL}/roadmap?${params.toString()}`
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        displayAIResult(
            "roadmapResult",
            data
        );


    } catch (error) {

        console.error(
            "Roadmap Error:",
            error
        );

        showError(
            "roadmapResult",
            error
        );
    }
}


// =====================================================
// INTERVIEW
// =====================================================

async function generateInterview() {

    const roleElement =
        document.getElementById("interviewRole");


    if (!roleElement) {
        return;
    }


    const role =
        roleElement.value.trim();


    if (!role) {

        alert(
            "Please enter an interview role."
        );

        return;
    }


    showLoading(
        "interviewResult",
        "AI is preparing your interview questions..."
    );


    try {

        const params =
            new URLSearchParams();

        params.append(
            "role",
            role
        );


        const response =
            await fetch(
                `${API_BASE_URL}/interview?${params.toString()}`
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        displayAIResult(
            "interviewResult",
            data
        );


    } catch (error) {

        console.error(
            "Interview Error:",
            error
        );

        showError(
            "interviewResult",
            error
        );
    }
}


// =====================================================
// SKILL GAP ANALYZER
// =====================================================

async function analyzeSkillGap() {

    const skillsElement =
        document.getElementById("currentSkills");

    const targetRoleElement =
        document.getElementById("targetRole");


    if (!skillsElement ||
        !targetRoleElement) {

        return;
    }


    const skills =
        skillsElement.value.trim();

    const targetRole =
        targetRoleElement.value.trim();


    if (!skills || !targetRole) {

        alert(
            "Please enter your skills and target role."
        );

        return;
    }


    showLoading(
        "skillGapResult",
        "AI is analyzing your skill gap..."
    );


    try {

        const params =
            new URLSearchParams();

        params.append(
            "skills",
            skills
        );

        params.append(
            "targetRole",
            targetRole
        );


        const response =
            await fetch(
                `${API_BASE_URL}/skill-gap?${params.toString()}`
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        displayAIResult(
            "skillGapResult",
            data
        );


    } catch (error) {

        console.error(
            "Skill Gap Error:",
            error
        );

        showError(
            "skillGapResult",
            error
        );
    }
}


// =====================================================
// JOB RECOMMENDATION
// =====================================================

async function getJobRecommendations() {

    const skillsElement =
        document.getElementById("jobSkills");

    const targetRoleElement =
        document.getElementById("jobTargetRole");

    const locationElement =
        document.getElementById("jobLocation");


    if (!skillsElement ||
        !targetRoleElement ||
        !locationElement) {

        return;
    }


    const skills =
        skillsElement.value.trim();

    const targetRole =
        targetRoleElement.value.trim();

    const location =
        locationElement.value.trim();


    if (!skills ||
        !targetRole ||
        !location) {

        alert(
            "Please enter skills, target role and location."
        );

        return;
    }


    showLoading(
        "jobRecommendationResult",
        "AI is finding suitable job recommendations..."
    );


    try {

        const params =
            new URLSearchParams();

        params.append(
            "skills",
            skills
        );

        params.append(
            "targetRole",
            targetRole
        );

        params.append(
            "location",
            location
        );


        const response =
            await fetch(
                `${API_BASE_URL}/job-recommendation?${params.toString()}`
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        displayAIResult(
            "jobRecommendationResult",
            data
        );


    } catch (error) {

        console.error(
            "Job Recommendation Error:",
            error
        );

        showError(
            "jobRecommendationResult",
            error
        );
    }
}


// =====================================================
// DASHBOARD
// =====================================================

async function generateDashboard(showAlert = true) {

    const skillsElement =
        document.getElementById("dashboardSkills");

    const targetRoleElement =
        document.getElementById("dashboardTargetRole");


    if (!skillsElement ||
        !targetRoleElement) {

        console.error(
            "Dashboard fields not found."
        );

        return;
    }


    const skills =
        skillsElement.value.trim();

    const targetRole =
        targetRoleElement.value.trim();


    if (!skills || !targetRole) {

        if (showAlert) {

            alert(
                "Please enter your skills and target role."
            );

        }

        return;
    }


    const roleDisplay =
        document.getElementById(
            "dashboardRole"
        );


    if (roleDisplay) {

        roleDisplay.innerText =
            targetRole;

    }


    showLoading(
        "dashboardResult",
        "AI is analyzing your career profile..."
    );


    const skillScore =
        document.getElementById(
            "skillScore"
        );


    const jobReadiness =
        document.getElementById(
            "jobReadiness"
        );


    if (skillScore) {
        skillScore.innerText = "⏳";
    }


    if (jobReadiness) {
        jobReadiness.innerText = "⏳";
    }


    try {

        const params =
            new URLSearchParams();

        params.append(
            "skills",
            skills
        );

        params.append(
            "targetRole",
            targetRole
        );


        const response =
            await fetch(
                `${API_BASE_URL}/dashboard?${params.toString()}`
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        // =================================================
        // EXTRACT SKILL SCORE
        // =================================================

        const skillMatch =
            data.match(
                /skill\s*score[^0-9]{0,100}(\d{1,3})\s*(?:\/\s*100|%|out\s+of\s+100)?/i
            );


        // =================================================
        // EXTRACT JOB READINESS
        // =================================================

        const readinessMatch =
            data.match(
                /job\s*readiness[^0-9]{0,100}(\d{1,3})\s*(?:\/\s*100|%|out\s+of\s+100)?/i
            );


        if (skillMatch && skillScore) {

            let score =
                parseInt(
                    skillMatch[1],
                    10
                );


            if (score > 100) {
                score = 100;
            }


            skillScore.innerText =
                score + "%";

        } else if (skillScore) {

            skillScore.innerText =
                "AI";
        }


        if (readinessMatch && jobReadiness) {

            let readiness =
                parseInt(
                    readinessMatch[1],
                    10
                );


            if (readiness > 100) {
                readiness = 100;
            }


            jobReadiness.innerText =
                readiness + "%";

        } else if (jobReadiness) {

            jobReadiness.innerText =
                "AI";
        }


        displayAIResult(
            "dashboardResult",
            data
        );


    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );


        if (skillScore) {
            skillScore.innerText = "--";
        }


        if (jobReadiness) {
            jobReadiness.innerText = "--";
        }


        showError(
            "dashboardResult",
            error
        );
    }
}


// =====================================================
// AUTOMATIC DASHBOARD GENERATION
// =====================================================

function autoGenerateDashboard(profile) {

    if (!profile) {
        return;
    }


    const dashboardSkills =
        document.getElementById(
            "dashboardSkills"
        );

    const dashboardTargetRole =
        document.getElementById(
            "dashboardTargetRole"
        );


    if (!dashboardSkills ||
        !dashboardTargetRole) {

        return;
    }


    const skills =
        (profile.skills || "").trim();

    const targetRole =
        (profile.targetRole || "").trim();


    if (!skills || !targetRole) {
        return;
    }


    dashboardSkills.value =
        skills;

    dashboardTargetRole.value =
        targetRole;


    // Wait until the page is ready
    setTimeout(function () {

        generateDashboard(false);

    }, 500);
}


// =====================================================
// RESUME ANALYZER
// =====================================================

async function analyzeResume() {

    const fileInput =
        document.getElementById(
            "resumeFile"
        );


    if (!fileInput ||
        !fileInput.files.length) {

        alert(
            "Please select your resume first."
        );

        return;
    }


    const file =
        fileInput.files[0];


    const result =
        document.getElementById(
            "resumeResult"
        );


    if (result) {

        result.innerHTML = `
            <div class="loading-message">
                📄 Analyzing your resume...
                <br><br>
                Please wait...
            </div>
        `;
    }


    try {

        const formData =
            new FormData();


        formData.append(
            "file",
            file
        );


        const response =
            await fetch(
                `${API_BASE_URL}/analyze-resume`,
                {
                    method: "POST",
                    body: formData
                }
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        displayAIResult(
            "resumeResult",
            data
        );


    } catch (error) {

        console.error(
            "Resume Error:",
            error
        );

        showError(
            "resumeResult",
            error
        );
    }
}


// =====================================================
// SAVE CAREER PROFILE
// =====================================================

function saveCareerProfile() {

    const nameElement =
        document.getElementById(
            "profileName"
        );

    const educationElement =
        document.getElementById(
            "profileEducation"
        );

    const skillsElement =
        document.getElementById(
            "profileSkills"
        );

    const interestsElement =
        document.getElementById(
            "profileInterests"
        );

    const targetRoleElement =
        document.getElementById(
            "profileTargetRole"
        );

    const locationElement =
        document.getElementById(
            "profileLocation"
        );


    if (!nameElement ||
        !educationElement ||
        !skillsElement ||
        !interestsElement ||
        !targetRoleElement ||
        !locationElement) {

        alert(
            "Profile fields not found."
        );

        return;
    }


    const name =
        nameElement.value.trim();

    const education =
        educationElement.value.trim();

    const skills =
        skillsElement.value.trim();

    const interests =
        interestsElement.value.trim();

    const targetRole =
        targetRoleElement.value.trim();

    const location =
        locationElement.value.trim();


    if (
        !name ||
        !education ||
        !skills ||
        !interests ||
        !targetRole ||
        !location
    ) {

        alert(
            "Please fill all career profile fields."
        );

        return;
    }


    const profile = {

        name: name,

        education: education,

        skills: skills,

        interests: interests,

        targetRole: targetRole,

        location: location

    };


    // Save to browser
    localStorage.setItem(
        "careerProfile",
        JSON.stringify(profile)
    );


    // Automatically fill all features
    fillCareerFeatures(
        profile
    );


    // Profile success message
    const result =
        document.getElementById(
            "profileResult"
        );


    if (result) {

        result.innerHTML = `

            <div class="success-message">

                ✅ Career profile saved successfully!

                <br><br>

                Welcome,
                <strong>
                    ${escapeHtml(profile.name)}
                </strong>
                👋

            </div>

        `;
    }


    // Automatically generate Dashboard
    autoGenerateDashboard(
        profile
    );
}


// =====================================================
// LOAD CAREER PROFILE
// =====================================================

function loadCareerProfile() {

    const savedProfile =
        localStorage.getItem(
            "careerProfile"
        );


    if (!savedProfile) {

        alert(
            "No career profile found. Please save your profile first."
        );

        return;
    }


    try {

        const profile =
            JSON.parse(
                savedProfile
            );


        const fields = {

            profileName:
                profile.name || "",

            profileEducation:
                profile.education || "",

            profileSkills:
                profile.skills || "",

            profileInterests:
                profile.interests || "",

            profileTargetRole:
                profile.targetRole || "",

            profileLocation:
                profile.location || ""

        };


        Object.keys(fields).forEach(
            function(id) {

                const element =
                    document.getElementById(id);

                if (element) {

                    element.value =
                        fields[id];

                }

            }
        );


        // Fill all other features
        fillCareerFeatures(
            profile
        );


        // Show success
        const result =
            document.getElementById(
                "profileResult"
            );


        if (result) {

            result.innerHTML = `

                <div class="success-message">

                    📂 Career profile loaded successfully!

                    <br><br>

                    Welcome back,
                    <strong>
                        ${escapeHtml(profile.name)}
                    </strong>
                    👋

                </div>

            `;
        }


        // Automatically generate Dashboard
        autoGenerateDashboard(
            profile
        );


    } catch (error) {

        console.error(
            "Profile Load Error:",
            error
        );

        alert(
            "Unable to load your saved profile."
        );
    }
}


// =====================================================
// AUTOMATICALLY FILL ALL CAREER FEATURES
// =====================================================

function fillCareerFeatures(profile) {

    if (!profile) {
        return;
    }


    // =================================================
    // DASHBOARD
    // =================================================

    const dashboardSkills =
        document.getElementById(
            "dashboardSkills"
        );

    const dashboardRole =
        document.getElementById(
            "dashboardTargetRole"
        );


    if (dashboardSkills) {

        dashboardSkills.value =
            profile.skills || "";
    }


    if (dashboardRole) {

        dashboardRole.value =
            profile.targetRole || "";
    }


    const dashboardRoleDisplay =
        document.getElementById(
            "dashboardRole"
        );


    if (dashboardRoleDisplay) {

        dashboardRoleDisplay.innerText =
            profile.targetRole || "--";
    }


    // =================================================
    // SKILL GAP
    // =================================================

    const currentSkills =
        document.getElementById(
            "currentSkills"
        );

    const targetRole =
        document.getElementById(
            "targetRole"
        );


    if (currentSkills) {

        currentSkills.value =
            profile.skills || "";
    }


    if (targetRole) {

        targetRole.value =
            profile.targetRole || "";
    }


    // =================================================
    // JOB RECOMMENDATION
    // =================================================

    const jobSkills =
        document.getElementById(
            "jobSkills"
        );

    const jobTargetRole =
        document.getElementById(
            "jobTargetRole"
        );

    const jobLocation =
        document.getElementById(
            "jobLocation"
        );


    if (jobSkills) {

        jobSkills.value =
            profile.skills || "";
    }


    if (jobTargetRole) {

        jobTargetRole.value =
            profile.targetRole || "";
    }


    if (jobLocation) {

        jobLocation.value =
            profile.location || "";
    }


    // =================================================
    // ROADMAP
    // =================================================

    const careerGoal =
        document.getElementById(
            "careerGoal"
        );


    if (careerGoal) {

        careerGoal.value =
            profile.targetRole || "";
    }


    // =================================================
    // INTERVIEW
    // =================================================

    const interviewRole =
        document.getElementById(
            "interviewRole"
        );


    if (interviewRole) {

        interviewRole.value =
            profile.targetRole || "";
    }


    // =================================================
    // RECOMMENDATION
    // =================================================

    const skillsInput =
        document.getElementById(
            "skills"
        );

    const interestsInput =
        document.getElementById(
            "interests"
        );

    const educationInput =
        document.getElementById(
            "goals"
        );


    if (skillsInput) {

        skillsInput.value =
            profile.skills || "";
    }


    if (interestsInput) {

        interestsInput.value =
            profile.interests || "";
    }


    if (educationInput) {

        educationInput.value =
            profile.education || "";
    }


    console.log(
        "Career features automatically filled."
    );
}


// =====================================================
// CLEAR CAREER PROFILE
// =====================================================

function clearCareerProfile() {

    const confirmDelete =
        confirm(
            "Are you sure you want to clear your saved career profile?"
        );


    if (!confirmDelete) {
        return;
    }


    localStorage.removeItem(
        "careerProfile"
    );


    const fields = [

        "profileName",

        "profileEducation",

        "profileSkills",

        "profileInterests",

        "profileTargetRole",

        "profileLocation"

    ];


    fields.forEach(
        function(id) {

            const element =
                document.getElementById(id);

            if (element) {

                element.value = "";

            }

        }
    );


    alert(
        "Career profile cleared successfully."
    );
}


// =====================================================
// AUTO LOAD PROFILE WHEN WEBSITE OPENS
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        checkLoginStatus();

        const savedProfile =
            localStorage.getItem(
                "careerProfile"
            );


        if (!savedProfile) {
            return;
        }


        try {

            const profile =
                JSON.parse(
                    savedProfile
                );


            const fields = {

                profileName:
                    profile.name || "",

                profileEducation:
                    profile.education || "",

                profileSkills:
                    profile.skills || "",

                profileInterests:
                    profile.interests || "",

                profileTargetRole:
                    profile.targetRole || "",

                profileLocation:
                    profile.location || ""

            };


            Object.keys(fields).forEach(
                function(id) {

                    const element =
                        document.getElementById(id);

                    if (element) {

                        element.value =
                            fields[id];

                    }

                }
            );


            // Fill all features
            fillCareerFeatures(
                profile
            );


            // Automatically generate Dashboard
            autoGenerateDashboard(
                profile
            );


            console.log(
                "Saved career profile loaded automatically."
            );


        } catch (error) {

            console.error(
                "Automatic Profile Load Error:",
                error
            );

        }

    }
);


// =====================================================
// DELETE ALL CHAT HISTORY
// =====================================================

async function deleteAllChats() {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete all chat history?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/chat-history`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const data =
            await response.text();


        alert(
            data
        );


        loadChatHistory();


    } catch (error) {

        console.error(
            "Delete History Error:",
            error
        );

        alert(
            "Unable to delete chat history."
        );
    }
}


// =====================================================
// LOAD CHAT HISTORY
// =====================================================

async function loadChatHistory() {

    const result =
        document.getElementById(
            "historyResult"
        );


    if (result) {

        result.innerHTML = `

            <div class="loading-message">

                📜 Loading chat history...

            </div>

        `;
    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/chat-history`
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        const chats =
            await response.json();


        if (!chats ||
            chats.length === 0) {

            if (result) {

                result.innerHTML = `

                    <div class="empty-message">

                        📭 No chat history found.

                    </div>

                `;
            }

            return;
        }


        let html = "";


        chats.forEach(
            function(chat) {

                const chatId =
                    escapeHtml(
                        chat.id || ""
                    );


                html += `

                    <div class="history-item">

                        <div class="history-content">

                            <h3>
                                💬 Chat
                            </h3>

                            <p>
                                ${escapeHtml(
                                    chat.question || ""
                                )}
                            </p>

                            <div class="history-answer">

                                ${
                                    typeof marked !== "undefined"
                                        ? marked.parse(
                                            chat.answer || ""
                                        )
                                        : escapeHtml(
                                            chat.answer || ""
                                        )
                                }

                            </div>

                        </div>


                        <button
                            class="danger-button"
                            onclick="deleteChat('${chatId}')">

                            🗑️ Delete

                        </button>

                    </div>

                `;
            }
        );


        if (result) {

            result.innerHTML =
                html;

        }


    } catch (error) {

        console.error(
            "History Error:",
            error
        );

        showError(
            "historyResult",
            error
        );
    }
}


// =====================================================
// DELETE ONE CHAT
// =====================================================

async function deleteChat(id) {

    if (!id) {

        alert(
            "Chat ID not found."
        );

        return;
    }


    const confirmDelete =
        confirm(
            "Delete this chat?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_BASE_URL}/chat-history/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Server error: " +
                response.status
            );
        }


        alert(
            "Chat deleted successfully."
        );


        loadChatHistory();


    } catch (error) {

        console.error(
            "Delete Chat Error:",
            error
        );

        alert(
            "Unable to delete this chat."
        );
    }
}

// =====================================================
// REGISTER USER
// =====================================================

async function registerUser() {

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all registration fields.");
        return;
    }

    const result = document.getElementById("registerResult");

    result.innerHTML = `
        <div class="loading-message">
            📝 Creating your account...
        </div>
    `;

    try {

        const response = await fetch(
            `${API_BASE_URL}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.text();

        if (!response.ok) {
            throw new Error(data || "Registration failed.");
        }

        result.innerHTML = `
            <div class="success-message">
                ✅ ${escapeHtml(data)}
                <br><br>
                You can now login.
            </div>
        `;

        // Clear registration fields
        document.getElementById("registerName").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";

    } catch (error) {

        console.error("Register Error:", error);

        result.innerHTML = `
            <div class="error-message">
                ❌ Registration failed.
                <br><br>
                ${escapeHtml(error.message)}
            </div>
        `;
    }
}



// =====================================================
// LOGIN USER
// =====================================================

async function loginUser() {

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    const result = document.getElementById("loginResult");

    result.innerHTML = `
        <div class="loading-message">
            🔐 Logging in...
        </div>
    `;

    try {

        const response = await fetch(
            `${API_BASE_URL}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }
        );

        const data = await response.text();

        if (!response.ok) {
            throw new Error(data || "Login failed.");
        }

        if (data.toLowerCase().includes("login successful")) {

            // Save login information locally
            localStorage.setItem(
                "loggedInUser",
                email
            );

            result.innerHTML = `
                <div class="success-message">
                    ✅ ${escapeHtml(data)}
                    <br><br>
                    🎉 You are now logged in.
                </div>
            `;

            // Clear password
            document.getElementById("loginPassword").value = "";

        } else {

            result.innerHTML = `
                <div class="error-message">
                    ❌ ${escapeHtml(data)}
                </div>
            `;
        }

    } catch (error) {

        console.error("Login Error:", error);

        result.innerHTML = `
            <div class="error-message">
                ❌ Login failed.
                <br><br>
                ${escapeHtml(error.message)}
            </div>
        `;
    }
}



// =====================================================
// CHECK LOGIN WHEN WEBSITE OPENS
// =====================================================

function checkLoginStatus() {

    const loggedInUser =
        localStorage.getItem("loggedInUser");

    if (loggedInUser) {

        console.log(
            "Logged-in user:",
            loggedInUser
        );
    }
}