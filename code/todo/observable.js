/**
 * @module observable offers functions to observe things
 */
// Observe values on their changes
export const Observable = value => {
    const listeners = [];
    return {
        onChange: callback => {
            listeners.push(callback);
            callback(value, value);
        },
        getValue: () => value,
        setValue: newValue => {
            if (value === newValue) return;
            const oldValue = value;
            value = newValue;
            listeners.forEach(callback => callback(value, oldValue));
        }
    }
};

// List for all listeners and handlers to notice changes
export const ObservableList = list => {
    const addListeners = [];
    const delListeners = [];
    const removeAt = array => index => array.splice(index, 1);
    const removeItem = array => item => { const i = array.indexOf(item); if (0 <= i) removeAt(array)(i); };
    const listRemoveItem = removeItem(list);
    const delListenersRemove = removeAt(delListeners);

    return {
        onAdd: listener => addListeners.push(listener),
        onDel: listener => delListeners.push(listener),
        add: item => {
            list.push(item);
            addListeners.forEach(listener => listener(item))
        },
        del: item => {
            listRemoveItem(item);
            const safeIterate = [...delListeners];
            safeIterate.forEach((listener, index) => listener(item, () => delListenersRemove(index)));
        },
        removeDeleteListener: removeItem(delListeners),
        count: () => list.length,
        countIf: pred => list.reduce((sum, item) => pred(item) ? sum + 1 : sum, 0)
    }
};

// Execute asynchronous tasks in strict sequence
export const Scheduler = () => {
    let inProcess = false;
    const tasks = [];
    
    function process() {
        if (inProcess) { return; }
        if (0 === tasks.length) { return; }
        inProcess = true;
        const task = tasks.pop();

        let wasOk = false;
        const ok = () => wasOk = true;
        const doit = new Promise((resolve, reject) => {
            task(resolve);
        }).then(() => {
            inProcess = false;
            process();
        });
    }

    function add(task) {
        tasks.unshift(task);
        process();
    }

    return {
        add: add,
        addOk: task => add(ok => { task(); ok(); }) // convenience
    }
};
