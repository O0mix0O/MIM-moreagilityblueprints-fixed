export function setup(ctx) {
    ctx.onInterfaceReady(() => {
        const swalModalClass = 'swal2-container';
        const elementsToBlur = ['page-container', 'skill-footer-minibar-container'];

        function toggleBlur(isBlurred) {
            elementsToBlur.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    element.style.filter = isBlurred ? 'blur(5px)' : 'none';
                }
            });
        }

        function monitorSwalModal() {
            const intervalId = setInterval(() => {
                const swalModal = document.querySelector(`.${swalModalClass}`);
                const isSwalModalVisible = swalModal !== null && swalModal.style.display !== 'none';

                toggleBlur(isSwalModalVisible);

                // If the modal is removed from the DOM and is no longer visible, stop monitoring
                if (!document.body.contains(swalModal) && !isSwalModalVisible) {
                    clearInterval(intervalId);
                    toggleBlur(false);
                }
            }, 100);
        }

        // Detect visibility of the modal on game resume or reload
        const visibilityChangeHandler = () => {
            if (document.hidden) return;

            // Re-run the modal monitor when the game becomes visible again
            monitorSwalModal();
        };

        // Add visibility change event listener
        document.addEventListener("visibilitychange", visibilityChangeHandler, false);

        // Initial modal monitoring on setup
        monitorSwalModal();
    });
}
