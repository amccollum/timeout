!((timeout) ->
    _timeouts = {}
    timeout.timeout = (name, delay, fn) ->
        if typeof name == 'string'
            args = Array.prototype.slice.call(arguments, 3)
            if name of _timeouts
                data = _timeouts[name]
                clearTimeout(data.id)
            else
                _timeouts[name] = data = {}
        
        else
            # Shift arguments over
            fn = delay
            delay = name
            name = null

            args = Array.prototype.slice.call(arguments, 2)
            data = {}
        
        if fn
            resetTimeout = () -> data.id = setTimeout(data.fn, delay)
            data.fn = () =>
                if fn.apply(this, args) == true
                    resetTimeout()
                else
                    delete _timeouts[name]
            
            resetTimeout()
            
        else
            if delay?
                data.fn()
            else
                delete _timeouts[name]

)(exports ? (@['timeout'] = {}))