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

                if (!document.body.contains(swalModal) && !isSwalModalVisible) {
                    clearInterval(intervalId);
                    toggleBlur(false);
                }
            }, 100);
        }

        monitorSwalModal();
    });
}
