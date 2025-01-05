// Set up lessons array
let lessons = [
    {
        id: 1,
        title: "Time Management",
        content: "Effective time management is crucial for productivity and reducing stress. Here are some tips:\n\n1. Prioritize tasks based on urgency and importance.\n2. Break tasks into smaller, manageable chunks.\n3. Use time-blocking techniques to allocate specific time slots for different tasks.\n4. Minimize distractions and focus on one task at a time.\n5. Regularly review and adjust your schedule as needed.\n6. Don't forget to schedule time for breaks and self-care to maintain balance.",
        completed: false
    },
    {
        id: 2,
        title: "Stress Management",
        content: "Stress is a natural part of life, but managing it effectively is essential for well-being. Here are some strategies:\n\n1. Practice deep breathing exercises to calm the nervous system.\n2. Engage in regular physical activity to reduce tension and boost mood.\n3. Use mindfulness techniques, such as meditation or yoga, to cultivate awareness and reduce reactivity.\n4. Maintain a healthy lifestyle with balanced nutrition, adequate sleep, and regular relaxation.\n5. Seek social support from friends, family, or support groups.\n6. Consider seeking professional help if stress becomes overwhelming.",
        completed: false
    },
    {
        id: 3,
        title: "Effective Communication",
        content: "Effective communication is essential for building strong relationships and achieving goals. Here are some tips:\n\n1. Practice active listening by giving your full attention to the speaker and paraphrasing their message to ensure understanding.\n2. Use 'I' statements to express your thoughts and feelings without blaming others.\n3. Be clear and concise in your communication, avoiding jargon or ambiguous language.\n4. Ask for feedback and be open to constructive criticism to improve your communication skills.\n5. Adapt your communication style to the needs of the situation and the preferences of the listener.\n6. Practice empathy and try to see things from the perspective of others.",
        completed: false
    },
    {
        id: 4,
        title: "Goal Setting",
        content: "Setting goals helps you clarify your priorities and focus your efforts on what matters most. Here are some steps to effective goal setting:\n\n1. Set specific, measurable, achievable, relevant, and time-bound (SMART) goals to increase clarity and motivation.\n2. Break down big goals into smaller, actionable steps to make progress manageable.\n3. Write down your goals and review them regularly to stay focused and track your progress.\n4. Stay flexible and adjust your goals as needed based on changing circumstances or priorities.\n5. Celebrate your achievements along the way to maintain motivation and momentum.\n6. Seek support from friends, family, or mentors to help you stay accountable and overcome obstacles.",
        completed: false
    },
    {
        id: 5,
        title: "Decision Making",
        content: "Effective decision making is a valuable skill for navigating life's challenges and opportunities. Here are some strategies to improve your decision-making process:\n\n1. Gather relevant information and consider multiple perspectives before making a decision.\n2. Identify and clarify your goals and priorities to ensure alignment with your decisions.\n3. Evaluate the potential outcomes and consequences of each option, weighing the risks and benefits.\n4. Trust your intuition, but also use logical reasoning and evidence to support your decisions.\n5. Take action decisively once you've made a choice, and be prepared to adapt if circumstances change.\n6. Learn from both successes and failures to continuously refine your decision-making skills.",
        completed: false
    }
];

// stores lessons in local storage
let storedLessons = JSON.parse(localStorage.getItem('lessons'));
if (storedLessons) {
    lessons = storedLessons;
} else {
    localStorage.setItem('lessons', JSON.stringify(lessons));
}

document.addEventListener("DOMContentLoaded", function() {
    const dailyLessonsContainer = document.getElementById('daily-lessons');
    const completedTasksContainer = document.getElementById('completed-tasks');
    const toggleCompletedTasksButton = document.getElementById('toggle-completed-tasks');

    // Function to animate element appearance
    function animateElementAppearance(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(-10px)';

        void element.offsetWidth;

        element.style.transition = 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out';

        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }


    // Function to animate button click
    function animateButtonClick(button) {
        button.classList.add('button-clicked');

        setTimeout(() => {
            button.classList.remove('button-clicked');
        }, 300);
    }

    // CSS for button click animation
    const buttonClickedAnimationStyle = `
        .button-clicked {
            transform: scale(0.95); /* Scale down the button slightly */
        transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1;
        }
    `;

    // Create a <style> element and append the CSS animation
    const styleElement = document.createElement('style');
    styleElement.textContent = buttonClickedAnimationStyle;
    document.head.appendChild(styleElement);

    // Randomly select 2 daily tasks
    const dailyTasks = [];
    while (dailyTasks.length < 2) {
        const randomIndex = Math.floor(Math.random() * lessons.length);
        if (!dailyTasks.includes(lessons[randomIndex])) {
            dailyTasks.push(lessons[randomIndex]);
        }
    }

    // Render daily tasks
    dailyTasks.forEach(task => {
        const button = document.createElement('button');
        button.textContent = task.title;
        button.classList.add('lesson-button');
        button.addEventListener('click', function() {
            const content = task.content;
            renderTaskIntroduction(content, task);
            toggleCompletedTasksButton.style.display = 'none';
        });
        dailyLessonsContainer.appendChild(button);
    });

    // Render completed tasks
    toggleCompletedTasksButton.addEventListener('click', function() {
        if (completedTasksContainer.classList.contains('hidden')) {
            completedTasksContainer.classList.remove('hidden');
            toggleCompletedTasksButton.textContent = 'Hide Completed Tasks';
            renderCompletedTasks();
            animateButtonClick(toggleCompletedTasksButton);
        } else {
            completedTasksContainer.classList.add('hidden');
            toggleCompletedTasksButton.textContent = 'Show Completed Tasks';
            animateButtonClick(toggleCompletedTasksButton);
        }
    });

    // Renders users completed tasks
    function renderCompletedTasks() {
        completedTasksContainer.innerHTML = '';
        const completedTasks = lessons.filter(task => task.completed);
        if (completedTasks.length === 0) {
            completedTasksContainer.textContent = 'No tasks have been completed.';
        } else {
            completedTasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.textContent = task.title;
                taskElement.classList.add('completed-task');
                completedTasksContainer.appendChild(taskElement);
            });
        }
    }
    let imgElement;
    let pElement;
    let h2Element;
    let newH2;
    // Render task introduction
    function renderTaskIntroduction(content, task) {
        const mainContent = document.querySelector('.main-content');
        const dailyLessonsContainer = document.getElementById('daily-lessons');

        // Hide h2, image, and p elements
        h2Element = mainContent.querySelector('h2');
        imgElement = mainContent.querySelector('.skills-image');
        pElement = mainContent.querySelector('p');

        h2Element.style.display = 'none';
        imgElement.style.display = 'none';
        pElement.style.display = 'none';

        const taskButtons = document.querySelectorAll('.lesson-button');
        taskButtons.forEach(button => {
            button.style.display = 'none';
        });

        // Create new h2 displaying the title of the task being taken
        newH2 = document.createElement('h2');
        newH2.textContent = task.title;
        mainContent.insertBefore(newH2, mainContent.firstChild);
        animateElementAppearance(newH2);

        // Store the original h2 display status
        const originalH2Displayed = true;

        // Create back button
        const backButtonToTasks = document.createElement('button');
        backButtonToTasks.textContent = 'Back to Tasks';
        backButtonToTasks.classList.add('back-button');
        backButtonToTasks.addEventListener('click', function() {
            // Reset the view to show the original content
            h2Element.style.display = originalH2Displayed ? 'block' : 'none';
            imgElement.style.display = 'block';
            pElement.style.display = 'block';
            newH2.remove();
            renderDailyTasks();
        });
        dailyLessonsContainer.appendChild(backButtonToTasks);
        animateElementAppearance(backButtonToTasks);



        // Create task content div
        const taskContent = document.createElement('div');
        taskContent.textContent = content.split('\n\n')[0];
        taskContent.classList.add('task-content');
        dailyLessonsContainer.appendChild(taskContent);
        animateElementAppearance(taskContent);

        // Create button to show steps
        const showStepsButton = document.createElement('button');
        showStepsButton.textContent = 'Show Steps';
        showStepsButton.classList.add('show-steps-button');
        showStepsButton.addEventListener('click', function() {
            renderTaskSteps(task);
        });
        dailyLessonsContainer.appendChild(showStepsButton);
        animateElementAppearance(showStepsButton);
    }


    // Render task steps
    function renderTaskSteps(task) {
        const dailyLessonsContainer = document.getElementById('daily-lessons');
        dailyLessonsContainer.innerHTML = '';

        // Create back button
        const backButtonToIntroduction = document.createElement('button');
        backButtonToIntroduction.textContent = 'Back to Introduction';
        backButtonToIntroduction.classList.add('back-button');
        backButtonToIntroduction.addEventListener('click', function() {
            dailyLessonsContainer.innerHTML = '';
            renderTaskIntroduction(task.content, task);
        });
        dailyLessonsContainer.appendChild(backButtonToIntroduction);
        animateElementAppearance(backButtonToIntroduction);


        // Split content into steps
        const steps = task.content.split('\n\n')[1].split('\n');
        let currentStepIndex = 0;

        // Render current step
        const stepElement = document.createElement('div');
        stepElement.textContent = steps[currentStepIndex];
        stepElement.classList.add('step');
        dailyLessonsContainer.appendChild(stepElement);

        const imageElement = document.createElement('img');
        imageElement.src = `images/SkillsImages/Lesson${task.id}Step{currentStepIndex + 1}.jpg`;
        imageElement.alt = `Step ${currentStepIndex + 1}`;
        imageElement.classList.add('lesson-image');
        dailyLessonsContainer.appendChild(imageElement);

        // Apply CSS transition to the step element
        stepElement.style.transition = 'transform 0.5s ease-in-out';

        // Function to handle swipe animation
        function swipeStepAnimation(swipeDirection) {
            const stepElement = document.querySelector('.step');
            const imageElement = document.querySelector('.lesson-image');

            if (swipeDirection === 'left') {
                stepElement.style.transform = 'translateX(-100%)';
            } else {
                stepElement.style.transform = 'translateX(100%)';
            }
            setTimeout(() => {
                if (swipeDirection === 'left' && currentStepIndex < steps.length - 1) {
                    currentStepIndex++;
                } else if (swipeDirection === 'right' && currentStepIndex > 0) {
                    currentStepIndex--;
                }
                renderStep(currentStepIndex);
                renderImage(currentStepIndex);

                stepElement.style.transition = 'none';
                stepElement.style.transform = 'translateX(0)';
                imageElement.style.transition = 'none';
                imageElement.style.opacity = '1';

                setTimeout(() => {
                    stepElement.style.transition = 'transform 0.5s ease-in-out';
                    imageElement.style.transition = 'opacity 0.5s ease-in-out';
                }, 100);
            }, 500);
        }

        // Event listener for Previous Step button
        const previousStepButton = document.createElement('button');
        previousStepButton.textContent = 'Previous Step';
        previousStepButton.classList.add('step-button');
        previousStepButton.addEventListener('click', function() {
            if (currentStepIndex > 0) {
                swipeStepAnimation('right');
                nextStepButton.textContent = 'Next Step';
                animateButtonClick(previousStepButton);
            }
        });

        // Event listener for Next Step button
        const nextStepButton = document.createElement('button');
        nextStepButton.textContent = 'Next Step';
        nextStepButton.classList.add('step-button');
        nextStepButton.addEventListener('click', function() {
            if (currentStepIndex < steps.length - 1) {
                swipeStepAnimation('left');
                if (currentStepIndex === steps.length - 2) {
                    nextStepButton.textContent = 'Complete Task';
                }
                animateButtonClick(nextStepButton);
            } else {
                task.completed = true;
                localStorage.setItem('lessons', JSON.stringify(lessons));
                renderTaskCompletionMessage();
            }
        });

        // Append previous and next step buttons to container
        dailyLessonsContainer.appendChild(previousStepButton);
        dailyLessonsContainer.appendChild(nextStepButton);

        // Function to render the step based on index with fade-in transition
        function renderStep(index) {
            stepElement.style.opacity = '0';
            setTimeout(() => {
                stepElement.textContent = steps[index];
                stepElement.style.opacity = '1';
            }, 250);
        }

        //Function to render image
        function renderImage(index) {
            imageElement.src = `images/SkillsImages/Lesson${task.id}Step${index + 1}.jpg`;
            imageElement.alt = `Step ${index + 1}`;
        }

        // Function to render task completion message
        function renderTaskCompletionMessage() {
            dailyLessonsContainer.innerHTML = '';

            // Create back button
            const backButtonToTaskPage = document.createElement('button');
            backButtonToTaskPage.textContent = 'Back to Task Page';
            backButtonToTaskPage.classList.add('back-button');
            backButtonToTaskPage.addEventListener('click', function() {
                imgElement.style.display = 'block';
                pElement.style.display = 'block';
                h2Element.style.display = 'block';
                newH2.remove();
                renderDailyTasks();
            });
            dailyLessonsContainer.appendChild(backButtonToTaskPage);
            animateElementAppearance(backButtonToTaskPage);


            // Create message
            const completionMessage = document.createElement('p');
            completionMessage.textContent = 'Task Completed';
            completionMessage.classList.add('completion-message');
            dailyLessonsContainer.appendChild(completionMessage);
        }
    }

    // Function to render daily tasks
    function renderDailyTasks() {
        dailyLessonsContainer.innerHTML = '';
        dailyTasks.forEach(task => {
            const button = document.createElement('button');
            button.textContent = task.title;
            button.classList.add('lesson-button');
            button.addEventListener('click', function() {
                const content = task.content;
                renderTaskIntroduction(content, task);
                toggleCompletedTasksButton.style.display = 'none';
                if (!completedTasksContainer.classList.contains('hidden')) {
                    completedTasksContainer.classList.add('hidden');
                    toggleCompletedTasksButton.textContent = 'Show Completed Tasks';
                }
            });
            dailyLessonsContainer.appendChild(button);
        });
        toggleCompletedTasksButton.style.display = 'block';
    }


    // Initial rendering of daily tasks
    renderDailyTasks();
});

