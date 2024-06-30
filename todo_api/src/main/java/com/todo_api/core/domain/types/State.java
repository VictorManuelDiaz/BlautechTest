package com.todo_api.core.domain.types;

public enum State {
	PENDING(0),
    IN_PROGRESS(1),
    COMPLETED(2);

    private final int value;

    State(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static State fromValue(int value) {
        for (State state : State.values()) {
            if (state.getValue() == value) {
                return state;
            }
        }
        throw new IllegalArgumentException("Invalid TaskState value: " + value);
    }
}
