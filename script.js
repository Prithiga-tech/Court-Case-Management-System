/**
 * Court Case Management System - Main Application
 * 
 * This application provides a digital platform for managing court cases
 * with different interfaces for judges, police, lawyers, and clients.
 */

// Constants
const USER_TYPES = {
    JUDGE: 'judge',
    POLICE: 'police',
    LAWYER: 'lawyer',
    CLIENT: 'client'
};

const CASE_STATUS = {
    REGISTERED: 'registered',
    INVESTIGATION: 'investigation',
    HEARING: 'hearing',
    CHARGESHEET: 'chargesheet',
    CLOSED: 'closed'
};

// Sample data for demonstration
const sampleCases = [
    {
        id: "C2023001",
        title: "State vs. Rahul Verma",
        type: "criminal",
        status: CASE_STATUS.HEARING,
        client: "Rahul Verma",
        aadhar: "123456789012",
        mobile: "9876543210",
        dob: "1990-05-15",
        gender: "male",
        description: "Theft case under IPC section 379",
        registeredDate: "2023-01-10",
        nextHearing: "2023-06-20 10:30",
        lawyer: "Advocate Priya Sharma",
        judge: "Justice Rajesh Kumar",
        police: "Inspector Vikram Singh",
        updates: [
            {
                date: "2023-01-15",
                by: "Inspector Vikram Singh",
                status: "Under Investigation",
                details: "Initial investigation started, evidence collected"
            },
            {
                date: "2023-03-10",
                by: "Justice Rajesh Kumar",
                status: "First Hearing",
                details: "Bail granted, next hearing scheduled"
            }
        ]
    },
    {
        id: "C2023002",
        title: "Sharma vs. Gupta Property Dispute",
        type: "property",
        status: CASE_STATUS.INVESTIGATION,
        client: "Rajesh Sharma",
        aadhar: "987654321098",
        mobile: "8765432109",
        dob: "1975-11-22",
        gender: "male",
        description: "Property dispute over ancestral land",
        registeredDate: "2023-02-05",
        nextHearing: "",
        lawyer: "Advocate Amit Patel",
        judge: "Justice Anjali Desai",
        police: "Sub-Inspector Ramesh Kumar",
        updates: [
            {
                date: "2023-02-10",
                by: "Sub-Inspector Ramesh Kumar",
                status: "Under Investigation",
                details: "Site inspection completed, documents being verified"
            }
        ]
    },
    {
        id: "C2023003",
        title: "Patel vs. Patel Divorce Case",
        type: "family",
        status: CASE_STATUS.HEARING,
        client: "Meena Patel",
        aadhar: "567890123456",
        mobile: "7654321098",
        dob: "1985-08-30",
        gender: "female",
        description: "Divorce petition with child custody dispute",
        registeredDate: "2023-03-15",
        nextHearing: "2023-07-05 14:00",
        lawyer: "Advocate Neha Gupta",
        judge: "Justice Sanjay Malhotra",
        police: "",
        updates: [
            {
                date: "2023-03-20",
                by: "Advocate Neha Gupta",
                status: "Petition Filed",
                details: "Divorce petition filed with family court"
            },
            {
                date: "2023-04-10",
                by: "Justice Sanjay Malhotra",
                status: "First Hearing",
                details: "Interim maintenance ordered, next hearing scheduled"
            }
        ]
    }
];

// DOM Elements
const elements = {
    pages: {
        home: document.getElementById('homePage'),
        login: document.getElementById('loginPage'),
        register: document.getElementById('registerPage'),
        judge: document.getElementById('judgePage'),
        police: document.getElementById('policePage'),
        lawyer: document.getElementById('lawyerPage'),
        client: document.getElementById('clientPage')
    },
    navLinks: {
        home: document.getElementById('homeLink'),
        login: document.getElementById('loginLink'),
        register: document.getElementById('registerLink')
    },
    featureButtons: {
        judge: document.getElementById('judgeFeature'),
        police: document.getElementById('policeFeature'),
        lawyer: document.getElementById('lawyerFeature'),
        client: document.getElementById('clientFeature')
    },
    logoutButtons: {
        judge: document.getElementById('judgeLogout'),
        police: document.getElementById('policeLogout'),
        lawyer: document.getElementById('lawyerLogout'),
        client: document.getElementById('clientLogout')
    },
    modal: {
        container: document.getElementById('caseModal'),
        title: document.getElementById('modalTitle'),
        content: document.getElementById('modalContent'),
        close: document.querySelector('.close-modal')
    },
    forms: {
        login: document.getElementById('loginForm'),
        registerCase: document.getElementById('caseForm'),
        scheduleHearing: document.getElementById('hearingForm'),
        updateCaseStatus: document.getElementById('policeUpdateForm'),
        checkCaseStatus: document.getElementById('clientCaseSearch')
    }
};

// Application State
const state = {
    currentUser: null,
    cases: [...sampleCases]
};

/**
 * Initialize the application
 */
function init() {
    setupEventListeners();
    showPage('home');
    setActiveNav('home');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Navigation links
    elements.navLinks.home.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('home');
        setActiveNav('home');
    });
    
    elements.navLinks.login.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('login');
        setActiveNav('login');
    });
    
    elements.navLinks.register.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register');
        setActiveNav('register');
    });
    
    // Feature buttons
    elements.featureButtons.judge.addEventListener('click', () => navigateToLogin(USER_TYPES.JUDGE));
    elements.featureButtons.police.addEventListener('click', () => navigateToLogin(USER_TYPES.POLICE));
    elements.featureButtons.lawyer.addEventListener('click', () => navigateToLogin(USER_TYPES.LAWYER));
    elements.featureButtons.client.addEventListener('click', () => navigateToLogin(USER_TYPES.CLIENT));
    
    // Learn more button
    document.getElementById('learnMoreBtn').addEventListener('click', () => {
        showPage('register');
        setActiveNav('register');
    });
    
    // Register from login link
    document.getElementById('registerFromLogin').addEventListener('click', (e) => {
        e.preventDefault();
        showPage('register');
        setActiveNav('register');
    });
    
    // Logout buttons
    Object.values(elements.logoutButtons).forEach(button => {
        button.addEventListener('click', logout);
    });
    
    // Form submissions
    elements.forms.login.addEventListener('submit', handleLogin);
    elements.forms.registerCase.addEventListener('submit', registerCase);
    elements.forms.scheduleHearing.addEventListener('submit', scheduleHearing);
    elements.forms.updateCaseStatus.addEventListener('submit', updateCaseStatus);
    elements.forms.checkCaseStatus.addEventListener('submit', checkCaseStatus);
    
    // Modal close
    elements.modal.close.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === elements.modal.container) {
            closeModal();
        }
    });
}

/**
 * Navigate to login page with pre-selected user type
 * @param {string} userType - The type of user (judge, police, lawyer, client)
 */
function navigateToLogin(userType) {
    showPage('login');
    setActiveNav('login');
    document.getElementById('userType').value = userType;
}

/**
 * Set active navigation link
 * @param {string} activeLink - The active navigation link
 */
function setActiveNav(activeLink) {
    Object.values(elements.navLinks).forEach(link => {
        link.classList.remove('active');
    });
    elements.navLinks[activeLink]?.classList.add('active');
}

/**
 * Show a specific page and hide others
 * @param {string} pageName - The name of the page to show
 */
function showPage(pageName) {
    // Hide all pages
    Object.values(elements.pages).forEach(page => {
        page?.classList.remove('active');
    });
    
    // Show the requested page
    elements.pages[pageName]?.classList.add('active');
    
    // If showing a dashboard page, populate the data
    if (pageName === 'judge') {
        populateJudgeCases();
    } else if (pageName === 'police') {
        populatePoliceCases();
    } else if (pageName === 'lawyer') {
        populateLawyerCases();
    }
}

/**
 * Handle login form submission
 * @param {Event} e - The form submission event
 */
function handleLogin(e) {
    e.preventDefault();
    
    const userType = document.getElementById('userType').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Simple validation - username and password must be same
    if (username !== password) {
        showError('Username and password must be the same for this demo');
        return;
    }
    
    if (!userType) {
        showError('Please select your user type');
        return;
    }
    
    // Set current user
    state.currentUser = {
        type: userType,
        name: username
    };
    
    // Show the appropriate dashboard
    switch(userType) {
        case USER_TYPES.JUDGE:
            document.getElementById('judgeName').textContent = `Justice ${username}`;
            showPage('judge');
            break;
        case USER_TYPES.POLICE:
            document.getElementById('policeName').textContent = `Inspector ${username}`;
            showPage('police');
            break;
        case USER_TYPES.LAWYER:
            document.getElementById('lawyerName').textContent = `Advocate ${username}`;
            showPage('lawyer');
            break;
        case USER_TYPES.CLIENT:
            // For client, find their name from cases
            const clientCase = state.cases.find(c => 
                c.client.toLowerCase().includes(username.toLowerCase())
            );
            if (clientCase) {
                document.getElementById('clientNameDisplay').textContent = clientCase.client;
                showPage('client');
            } else {
                showError('No cases found for this client. Please register a case first.');
            }
            break;
    }
    
    // Reset login form
    e.target.reset();
}

/**
 * Handle case registration
 * @param {Event} e - The form submission event
 */
function registerCase(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        type: document.getElementById('caseType').value,
        title: document.getElementById('caseTitle').value.trim(),
        description: document.getElementById('caseDescription').value.trim(),
        client: document.getElementById('clientName').value.trim(),
        aadhar: document.getElementById('clientAadhar').value.trim(),
        mobile: document.getElementById('clientMobile').value.trim(),
        dob: document.getElementById('clientDob').value,
        gender: document.getElementById('clientGender').value
    };
    
    // Validate Aadhar
    if (!/^\d{12}$/.test(formData.aadhar)) {
        showError('Aadhar number must be 12 digits');
        return;
    }
    
    // Validate mobile
    if (!/^\d{10}$/.test(formData.mobile)) {
        showError('Mobile number must be 10 digits');
        return;
    }
    
    // Create new case
    const newCase = {
        id: `C${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`,
        ...formData,
        status: CASE_STATUS.REGISTERED,
        registeredDate: new Date().toISOString().split('T')[0],
        nextHearing: "",
        lawyer: "",
        judge: "",
        police: "",
        updates: [
            {
                date: new Date().toISOString().split('T')[0],
                by: formData.client,
                status: "Case Registered",
                details: "Case registered by client"
            }
        ]
    };
    
    // Add to cases
    state.cases.push(newCase);
    
    // Show success message
    showModal(
        'Case Registered Successfully',
        `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <p>Your case has been registered successfully!</p>
            <p><strong>Case ID:</strong> ${newCase.id}</p>
            <p>Please note this number for future reference.</p>
            <button class="btn" onclick="closeModal()">Close</button>
        </div>
        `
    );
    
    // Reset form
    e.target.reset();
}

/**
 * Populate judge's case table
 */
function populateJudgeCases() {
    const tableBody = document.querySelector('#judgeCaseTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    state.cases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.title}</td>
            <td>${capitalizeFirstLetter(caseItem.type)}</td>
            <td><span class="case-status ${caseItem.status}">${formatStatus(caseItem.status)}</span></td>
            <td>${caseItem.nextHearing || 'Not scheduled'}</td>
            <td>
                <button class="action-btn" onclick="viewCaseDetails('${caseItem.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Populate police case table
 */
function populatePoliceCases() {
    const tableBody = document.querySelector('#policeCaseTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    state.cases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.title}</td>
            <td>${capitalizeFirstLetter(caseItem.type)}</td>
            <td><span class="case-status ${caseItem.status}">${formatStatus(caseItem.status)}</span></td>
            <td>${caseItem.registeredDate}</td>
            <td>
                <button class="action-btn" onclick="viewCaseDetails('${caseItem.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Populate lawyer's case table
 */
function populateLawyerCases() {
    const tableBody = document.querySelector('#lawyerCaseTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    // Filter cases assigned to this lawyer
    const lawyerCases = state.cases.filter(c => 
        c.lawyer.includes(state.currentUser?.name) || c.lawyer === ''
    );
    
    if (lawyerCases.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="no-cases">No cases assigned to you yet</td>
            </tr>
        `;
        return;
    }
    
    lawyerCases.forEach(caseItem => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.title}</td>
            <td>${caseItem.client}</td>
            <td>${caseItem.nextHearing || 'Not scheduled'}</td>
            <td><span class="case-status ${caseItem.status}">${formatStatus(caseItem.status)}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Schedule a hearing
 * @param {Event} e - The form submission event
 */
function scheduleHearing(e) {
    e.preventDefault();
    
    const caseId = document.getElementById('hearingCaseId').value.trim();
    const hearingDate = document.getElementById('hearingDate').value;
    const hearingTime = document.getElementById('hearingTime').value;
    
    // Validate inputs
    if (!caseId || !hearingDate || !hearingTime) {
        showError('Please fill all fields');
        return;
    }
    
    // Find the case
    const caseItem = state.cases.find(c => c.id === caseId);
    if (!caseItem) {
        showError('Case not found');
        return;
    }
    
    // Update case
    caseItem.nextHearing = `${hearingDate} ${hearingTime}`;
    caseItem.status = CASE_STATUS.HEARING;
    caseItem.updates.push({
        date: new Date().toISOString().split('T')[0],
        by: state.currentUser.name,
        status: "Hearing Scheduled",
        details: `Hearing scheduled for ${hearingDate} at ${hearingTime}`
    });
    
    // Show success message
    showModal(
        'Hearing Scheduled',
        `
        <div class="success-message">
            <i class="fas fa-calendar-check"></i>
            <p>Hearing scheduled successfully for case ${caseId}</p>
            <p><strong>Date:</strong> ${hearingDate}</p>
            <p><strong>Time:</strong> ${hearingTime}</p>
            <button class="btn" onclick="closeModal()">Close</button>
        </div>
        `
    );
    
    // Reset form and update table
    e.target.reset();
    populateJudgeCases();
}

/**
 * Update case status (police)
 * @param {Event} e - The form submission event
 */
function updateCaseStatus(e) {
    e.preventDefault();
    
    const caseId = document.getElementById('policeCaseId').value.trim();
    const status = document.getElementById('caseStatus').value;
    const updateDetails = document.getElementById('caseUpdate').value.trim();
    
    // Validate inputs
    if (!caseId || !status || !updateDetails) {
        showError('Please fill all fields');
        return;
    }
    
    // Find the case
    const caseItem = state.cases.find(c => c.id === caseId);
    if (!caseItem) {
        showError('Case not found');
        return;
    }
    
    // Update case
    caseItem.status = status;
    caseItem.updates.push({
        date: new Date().toISOString().split('T')[0],
        by: state.currentUser.name,
        status: getStatusDisplayText(status),
        details: updateDetails
    });
    
    // Show success message
    showModal(
        'Case Status Updated',
        `
        <div class="success-message">
            <i class="fas fa-check-circle"></i>
            <p>Case ${caseId} status updated successfully</p>
            <p><strong>New Status:</strong> ${formatStatus(status)}</p>
            <button class="btn" onclick="closeModal()">Close</button>
        </div>
        `
    );
    
    // Reset form and update table
    e.target.reset();
    populatePoliceCases();
}

/**
 * Check case status (client)
 * @param {Event} e - The form submission event
 */
function checkCaseStatus(e) {
    e.preventDefault();
    
    const caseId = document.getElementById('clientCaseId').value.trim();
    const caseItem = state.cases.find(c => c.id === caseId);
    
    const resultDiv = document.getElementById('caseStatusResult');
    if (!resultDiv) return;
    
    if (caseItem) {
        let html = `
            <div class="case-header">
                <h4>${caseItem.title}</h4>
                <span class="case-status ${caseItem.status}">${formatStatus(caseItem.status)}</span>
            </div>
            <div class="case-details">
                <p><strong>Case ID:</strong> ${caseItem.id}</p>
                <p><strong>Type:</strong> ${capitalizeFirstLetter(caseItem.type)}</p>
                <p><strong>Registered Date:</strong> ${caseItem.registeredDate}</p>
        `;
        
        if (caseItem.nextHearing) {
            html += `<p><strong>Next Hearing:</strong> ${caseItem.nextHearing}</p>`;
        }
        
        if (caseItem.lawyer) {
            html += `<p><strong>Lawyer:</strong> ${caseItem.lawyer}</p>`;
        }
        
        if (caseItem.judge) {
            html += `<p><strong>Judge:</strong> ${caseItem.judge}</p>`;
        }
        
        // Show updates
        html += `</div><div class="case-updates"><h5><i class="fas fa-history"></i> Case Updates:</h5><ul>`;
        caseItem.updates.forEach(update => {
            html += `
                <li>
                    <div class="update-header">
                        <strong>${update.date}</strong>
                        <span class="update-status">${update.status}</span>
                    </div>
                    <div class="update-details">${update.details}</div>
                    <div class="update-by">Updated by: ${update.by}</div>
                </li>
            `;
        });
        html += `</ul></div>`;
        
        resultDiv.innerHTML = html;
    } else {
        resultDiv.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                <p>Case not found. Please check the Case ID and try again.</p>
            </div>
        `;
    }
}

/**
 * View case details
 * @param {string} caseId - The ID of the case to view
 */
function viewCaseDetails(caseId) {
    const caseItem = state.cases.find(c => c.id === caseId);
    if (!caseItem) return;
    
    let html = `
        <div class="case-details-modal">
            <div class="detail-row">
                <span class="detail-label">Title:</span>
                <span class="detail-value">${caseItem.title}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Type:</span>
                <span class="detail-value">${capitalizeFirstLetter(caseItem.type)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Status:</span>
                <span class="detail-value case-status ${caseItem.status}">${formatStatus(caseItem.status)}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Client:</span>
                <span class="detail-value">${caseItem.client}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Aadhar:</span>
                <span class="detail-value">${caseItem.aadhar}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Mobile:</span>
                <span class="detail-value">${caseItem.mobile}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Description:</span>
                <span class="detail-value">${caseItem.description}</span>
            </div>
    `;
    
    if (caseItem.nextHearing) {
        html += `
            <div class="detail-row">
                <span class="detail-label">Next Hearing:</span>
                <span class="detail-value">${caseItem.nextHearing}</span>
            </div>
        `;
    }
    
    if (caseItem.lawyer) {
        html += `
            <div class="detail-row">
                <span class="detail-label">Lawyer:</span>
                <span class="detail-value">${caseItem.lawyer}</span>
            </div>
        `;
    }
    
    if (caseItem.judge) {
        html += `
            <div class="detail-row">
                <span class="detail-label">Judge:</span>
                <span class="detail-value">${caseItem.judge}</span>
            </div>
        `;
    }
    
    if (caseItem.police) {
        html += `
            <div class="detail-row">
                <span class="detail-label">Police Officer:</span>
                <span class="detail-value">${caseItem.police}</span>
            </div>
        `;
    }
    
    // Show updates
    html += `</div><div class="case-updates-modal"><h4>Case Updates:</h4><ul>`;
    caseItem.updates.forEach(update => {
        html += `
            <li>
                <div class="update-header">
                    <strong>${update.date}</strong>
                    <span class="update-status">${update.status}</span>
                </div>
                <div class="update-details">${update.details}</div>
                <div class="update-by">Updated by: ${update.by}</div>
            </li>
        `;
    });
    html += `</ul></div>`;
    
    showModal(`Case Details: ${caseId}`, html);
}

/**
 * Logout the current user
 */
function logout() {
    state.currentUser = null;
    showPage('home');
    setActiveNav('home');
}

/**
 * Show modal with given title and content
 * @param {string} title - The modal title
 * @param {string} content - The modal content HTML
 */
function showModal(title, content) {
    elements.modal.title.textContent = title;
    elements.modal.content.innerHTML = content;
    elements.modal.container.style.display = 'block';
}

/**
 * Close the modal
 */
function closeModal() {
    elements.modal.container.style.display = 'none';
}

/**
 * Show error message
 * @param {string} message - The error message to display
 */
function showError(message) {
    alert(message); // In a real app, you might want to show a prettier error message
}

/**
 * Format status for display
 * @param {string} status - The status to format
 * @returns {string} Formatted status text
 */
function formatStatus(status) {
    const statusMap = {
        [CASE_STATUS.REGISTERED]: 'Registered',
        [CASE_STATUS.INVESTIGATION]: 'Investigation',
        [CASE_STATUS.HEARING]: 'Hearing',
        [CASE_STATUS.CHARGESHEET]: 'Chargesheet Filed',
        [CASE_STATUS.CLOSED]: 'Closed'
    };
    return statusMap[status] || status;
}

/**
 * Get display text for status
 * @param {string} status - The status code
 * @returns {string} Display text for the status
 */
function getStatusDisplayText(status) {
    switch(status) {
        case CASE_STATUS.INVESTIGATION: return 'Under Investigation';
        case CASE_STATUS.CHARGESHEET: return 'Chargesheet Filed';
        case CASE_STATUS.CLOSED: return 'Case Closed';
        default: return status;
    }
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} The capitalized string
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);