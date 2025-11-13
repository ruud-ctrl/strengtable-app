export function runWithoutPropagation(func) {
    return (event) => {
        event.stopPropagation();
        event.nativeEvent.stopPropagation();
        return func && func(event);
    }
}