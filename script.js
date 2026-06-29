document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       TYPING ANIMATION (Hero Section)
       ========================================================================== */
    const typedTextSpan = document.getElementById('typed-text');
    const rolesList = [
        "Sinh viên Kinh tế", 
        "Nhà phân tích dữ liệu", 
        "Nhà nghiên cứu chính sách",
        "Chuyên viên tự động hóa"
    ];
    const typingSpeed = 100;
    const erasingSpeed = 60;
    const delayBetweenWords = 2000;
    let roleIndex = 0;
    let charIndex = 0;

    function typeWord() {
        if (charIndex < rolesList[roleIndex].length) {
            typedTextSpan.textContent += rolesList[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWord, typingSpeed);
        } else {
            setTimeout(eraseWord, delayBetweenWords);
        }
    }

    // Erase animation logic
    function eraseWord() {
        if (charIndex > 0) {
            typedTextSpan.textContent = rolesList[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseWord, erasingSpeed);
        } else {
            roleIndex = (roleIndex + 1) % rolesList.length;
            setTimeout(typeWord, typingSpeed + 300);
        }
    }

    // Start typing animation
    if (rolesList.length && typedTextSpan) {
        setTimeout(typeWord, 1000);
    }


    /* ==========================================================================
       NAVIGATION & SCROLL EFFECTS
       ========================================================================== */
    const header = document.querySelector('.header');
    const scrollProgress = document.getElementById('scroll-progress');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // 1. Scroll Progress and Header Shrink
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolledPct = (scrollTop / scrollHeight) * 100;
        
        // Progress Bar Update
        if (scrollProgress) {
            scrollProgress.style.width = scrolledPct + '%';
        }

        // Header Background Transition
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active Link Highlight on Scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // 2. Mobile Menu Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });

        // Close menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    }


    /* ==========================================================================
       SCROLL REVEAL TRIGGERS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // Set up reveal intersection observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Trigger once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================================================
       WORK EXPERIENCE TABS SWAP
       ========================================================================== */
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabLinks.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active classes
            tabLinks.forEach(link => {
                link.classList.remove('active');
                link.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                panel.style.display = 'none';
                panel.setAttribute('hidden', 'true');
            });

            // Set active states for clicked tab and target panel
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            
            const targetPanelId = tab.getAttribute('aria-controls');
            const targetPanel = document.getElementById(targetPanelId);
            
            if (targetPanel) {
                targetPanel.style.display = 'block';
                targetPanel.classList.add('active');
                targetPanel.removeAttribute('hidden');
            }
        });
    });


    /* ==========================================================================
       RESEARCH PROJECTS MODAL DATABASE & LOGIC
       ========================================================================== */
    // Detailed project data in Vietnamese
    const projectsDb = {
        "1": {
            title: "Nghiên cứu phúc lợi hộ gia đình tại tỉnh Quảng Ninh",
            subtitle: "Đánh giá thực nghiệm kinh tế lượng sử dụng dữ liệu khảo sát",
            image: "assets/project_1.png",
            tags: ["Kinh tế phúc lợi", "Stata", "Đánh giá chính sách"],
            meta: {
                role: "Trưởng nhóm Nghiên cứu thực nghiệm",
                duration: "6 tháng",
                venue: "Bài nghiên cứu hội thảo Khoa học sinh viên"
            },
            abstract: "Nghiên cứu này tìm hiểu các nhân tố quyết định đến phúc lợi hộ gia đình tại tỉnh Quảng Ninh dựa trên dữ liệu khảo sát. Chúng tôi phân tích các chỉ số đại diện cho phúc lợi như chi tiêu bình quân đầu người và thu nhập hộ gia đình tương quan với các đặc điểm kinh tế - xã hội như trình độ học vấn, quy mô hộ và khả năng tiếp cận dịch vụ công.",
            methodology: "Sử dụng phần mềm Stata để xây dựng mô hình hồi quy bình phương nhỏ nhất (OLS), đồng thời thực hiện các kiểm định phương sai sai số thay đổi và đa cộng tuyến để đảm bảo tính vững của mô hình.",
            results: "Kết quả cho thấy việc tiếp cận nguồn tín dụng vi mô và trình độ học vấn của chủ hộ có tác động tích cực lớn nhất đến phúc lợi hộ gia đình. Nghiên cứu đề xuất các giải pháp nâng cao sinh kế và giảm nghèo bền vững.",
            links: {
                github: "https://github.com",
                paper: "https://scholar.google.com"
            }
        },
        "2": {
            title: "Digital Government and Public Governance",
            subtitle: "Đánh giá hiệu quả hành chính công và tính minh bạch dựa trên dữ liệu",
            image: "assets/project_2.png",
            tags: ["Chính sách công", "Quản trị công", "Trực quan hóa", "Power BI"],
            meta: {
                role: "Nhà nghiên cứu dữ liệu chính sách",
                duration: "8 tháng",
                venue: "Đề tài nghiên cứu khoa học cấp khoa"
            },
            abstract: "Đề tài tập trung nghiên cứu tác động của các sáng kiến chính phủ số đối với hiệu quả cung cấp dịch vụ công và tính minh bạch hành chính tại các đơn vị cấp cơ sở. Chúng tôi theo dõi và so sánh các chỉ số hiệu suất trước và sau khi áp dụng nền tảng số.",
            methodology: "Tổng hợp dữ liệu từ cổng dịch vụ công quốc gia và khảo sát mức độ hài lòng của người dân. Xây dựng bảng điều khiển Power BI để theo dõi và trực quan hóa thời gian xử lý hồ sơ hành chính, xác định các điểm nghẽn quy trình.",
            results: "Số liệu thực nghiệm cho thấy thời gian xử lý thủ tục cấp phép kinh doanh giảm 28% và chỉ số niềm tin của người dân tăng 14% tại các địa phương áp dụng dịch vụ công trực tuyến mức độ 4.",
            links: {
                github: "https://github.com",
                paper: "https://scholar.google.com"
            }
        },
        "3": {
            title: "Social Insurance Participation Research",
            subtitle: "Đánh giá các yếu tố ảnh hưởng đến quyết định tham gia của lao động tự do",
            image: "assets/project_1.png",
            tags: ["An sinh xã hội", "R Programming", "Kinh tế lượng"],
            meta: {
                role: "Thành viên nghiên cứu định lượng",
                duration: "5 tháng",
                venue: "Kỷ yếu Hội thảo khoa học Kinh tế & Xã hội"
            },
            abstract: "Bảo hiểm xã hội tự nguyện đóng vai trò quan trọng trong việc xây dựng lưới an sinh xã hội. Nghiên cứu này phân tích các yếu tố quyết định hành vi tham gia bảo hiểm xã hội tự nguyện của người lao động trong khu vực phi chính thức.",
            methodology: "Ứng dụng mô hình hồi quy logistic nhị phân (Binary Logistic Regression) trên phần mềm R để phân tích mẫu khảo sát. Xem xét các biến tương quan như thu nhập, độ tuổi, và mức độ nhận thức về chính sách.",
            results: "Tìm ra rằng mức thu nhập ổn định và nhận thức về lợi ích dài hạn là hai yếu tố quyết định lớn nhất. Nghiên cứu đề xuất các mô hình truyền thông chính sách cải tiến để tăng tỷ lệ bao phủ bảo hiểm xã hội tự nguyện thêm 18%.",
            links: {
                github: "https://github.com",
                paper: "https://scholar.google.com"
            }
        }
    };

    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    let lastActiveElement = null;

    // Open Modal Function
    function openProjectModal(projectId) {
        const data = projectsDb[projectId];
        if (!data) return;

        // Save last focused element to restore it later (accessibility)
        lastActiveElement = document.activeElement;

        // Generate dynamic HTML for modal contents
        let tagsHtml = data.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
        
        modalContent.innerHTML = `
            <h3 class="modal-title">${data.title}</h3>
            <p class="modal-subtitle">${data.subtitle}</p>
            
            <img src="${data.image}" alt="${data.title}" class="modal-image">
            
            <div class="modal-meta-grid">
                <div class="modal-meta-item">
                    <span>Vai trò</span>
                    <p>${data.meta.role}</p>
                </div>
                <div class="modal-meta-item">
                    <span>Thời gian</span>
                    <p>${data.meta.duration}</p>
                </div>
                <div class="modal-meta-item">
                    <span>Đại diện / Đơn vị</span>
                    <p>${data.meta.venue}</p>
                </div>
            </div>

            <div class="modal-body">
                <div>
                    <h4>Tóm tắt đề tài (Abstract)</h4>
                    <p>${data.abstract}</p>
                </div>
                <div>
                    <h4>Phương pháp nghiên cứu & Công cụ</h4>
                    <p>${data.methodology}</p>
                </div>
                <div>
                    <h4>Kết quả đạt được</h4>
                    <p>${data.results}</p>
                </div>
            </div>

            <div class="modal-btn-row">
                <a href="${data.links.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    Mã nguồn dự án
                </a>
                <a href="${data.links.paper}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    Tài liệu công bố
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `;

        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Stop background scrolling

        // Focus close button for accessibility
        if (modalCloseBtn) {
            modalCloseBtn.focus();
        }
    }

    // Close Modal Function
    function closeProjectModal() {
        projectModal.classList.remove('active');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scrolling
        
        // Restore focus
        if (lastActiveElement) {
            lastActiveElement.focus();
        }
    }

    // Attach click listeners to cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            openProjectModal(projectId);
        });

        // Keypress accessibility to trigger click on enter key
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const projectId = card.getAttribute('data-project-id');
                openProjectModal(projectId);
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    // Close on backdrop click
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                closeProjectModal();
            }
        });
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });


    /* ==========================================================================
       CONTACT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formSubmitBtn = document.getElementById('formSubmitBtn');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Form inputs validation check
            const nameVal = document.getElementById('userName').value.trim();
            const emailVal = document.getElementById('userEmail').value.trim();
            const subjectVal = document.getElementById('userSubject').value.trim();
            const messageVal = document.getElementById('userMessage').value.trim();

            if (!nameVal || !emailVal || !subjectVal || !messageVal) {
                showFormStatus('Vui lòng điền đầy đủ tất cả các trường thông tin.', 'error');
                return;
            }

            // Lock submit button & show loading state
            formSubmitBtn.disabled = true;
            const btnText = formSubmitBtn.querySelector('.btn-text');
            const spinner = formSubmitBtn.querySelector('.spinner');
            
            if (btnText) btnText.textContent = 'Đang gửi thông tin...';
            if (spinner) spinner.classList.remove('hidden');

            // Simulate API request to server (1.5s delay)
            setTimeout(() => {
                // Success action
                showFormStatus(`Cảm ơn bạn, ${nameVal}! Lời nhắn của bạn đã được gửi thành công. Tôi sẽ phản hồi sớm nhất có thể.`, 'success');
                contactForm.reset();

                // Restore button state
                formSubmitBtn.disabled = false;
                if (btnText) btnText.textContent = 'Gửi tin nhắn';
                if (spinner) spinner.classList.add('hidden');
            }, 1500);
        });
    }

    function showFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = 'form-status-msg'; // Clear existing classes
        formStatus.classList.add(type);
        
        // Auto hide message after 6 seconds
        setTimeout(() => {
            formStatus.classList.add('hidden');
        }, 6000);
    }


    /* ==========================================================================
       EMAIL CLIPBOARD COPY FUNCTIONALITY
       ========================================================================== */
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const emailAddress = 'ptl050618@gmail.com';
            
            navigator.clipboard.writeText(emailAddress).then(() => {
                const copyIcon = copyEmailBtn.querySelector('.copy-icon');
                const checkIcon = copyEmailBtn.querySelector('.check-icon');
                
                // Swap icons to checkmark
                if (copyIcon && checkIcon) {
                    copyIcon.classList.add('hidden');
                    checkIcon.classList.remove('hidden');
                    copyEmailBtn.setAttribute('title', 'Đã sao chép!');
                    
                    // Revert back after 2.5 seconds
                    setTimeout(() => {
                        copyIcon.classList.remove('hidden');
                        checkIcon.classList.add('hidden');
                        copyEmailBtn.setAttribute('title', 'Sao chép vào khay nhớ tạm');
                    }, 2500);
                }
            }).catch(err => {
                console.error('Không thể sao chép: ', err);
            });
        });
    }
});
