export default function StepNavigation({
    onPreviousStep,
    onNextStep,
    nextLabel = "Next",
    previousLabel = "Previous",
    isNextDisabled = false,
}) {
    return (
        <div className="step-navigation">
            {onPreviousStep && (
                <button
                    type="button"
                    className="button-1"
                    onClick={onPreviousStep}
                >
                    {previousLabel}
                </button>
            )}

            {onNextStep && (
                <button
                    type="button"
                    className="button-1"
                    onClick={onNextStep}
                    disabled={isNextDisabled}
                >
                    {nextLabel}
                </button>
            )}
        </div>
    );
}
