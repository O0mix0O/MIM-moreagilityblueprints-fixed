export function setup(ctx) {
    ctx.onInterfaceReady(() => {
        const elementsToBlur = ['#page-container', '#skill-footer-minibar-container'];

        // Function to toggle blur on specific elements
        function toggleBlur(isBlurred) {
            elementsToBlur.forEach((id) => {
                const element = document.querySelector(id);
                if (element) {
                    element.style.filter = isBlurred ? 'blur(5px)' : 'none';
                }
            });

            // Also apply or remove blur for any existing game-notification elements
            const notifications = document.querySelectorAll('game-notification');
            notifications.forEach((notification) => {
                notification.style.filter = isBlurred ? 'blur(5px)' : 'none';
            });
        }

        // Function to check if an element is visible
        function isElementVisible(element) {
            const style = window.getComputedStyle(element);
            const isHidden = style.display === 'none' || element.getAttribute('aria-hidden') === 'true';
            return !isHidden;
        }

        // Function to check modal visibility and toggle blur
        function checkModalVisibility() {
            const infrontElements = document.querySelectorAll('.swal-infront, .modal-infront');
            const isAnyElementVisible = Array.from(infrontElements).some((element) => isElementVisible(element));
            toggleBlur(isAnyElementVisible);
        }

        // Initial check for modals (for the modal displayed at game load)
        function applyInitialBlur() {
            const infrontElements = document.querySelectorAll('.swal-infront, .modal-infront');
            const isAnyElementVisible = Array.from(infrontElements).some((element) => isElementVisible(element));

            // Immediately apply blur if any modal is already visible
            if (isAnyElementVisible) {
                toggleBlur(true);
            }
        }

        // Monitor the DOM for changes to dynamically added/removed modals
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && (node.classList.contains('swal-infront') || node.classList.contains('modal-infront'))) {
                        checkModalVisibility(); // Blur on modal addition
                    }
                });

                mutation.removedNodes.forEach((node) => {
                    if (node.nodeType === 1 && (node.classList.contains('swal-infront') || node.classList.contains('modal-infront'))) {
                        checkModalVisibility(); // Re-check blur on modal removal
                    }
                });
            });
        });

        // Set the observer to watch for added and removed nodes in the document body
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Perform an initial check to handle the game load modal
        applyInitialBlur();
    });
}
