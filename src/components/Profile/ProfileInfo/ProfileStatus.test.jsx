import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status='Hello World!' />); // create фейковое создание компаненты
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Hello World!');
    });

    test("after creation <input> shouldn't be displayed", () => {
        const component = create(<ProfileStatus status='Hello World!' />); // create фейковое создание компаненты
        const root = component.root;

        expect(() => {
            const input = root.findByType('input');
        }).toThrow();
    });

    test("after creation <span> should be displayed", () => {
        const component = create(<ProfileStatus status='Hello World!' />); // create фейковое создание компаненты
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<ProfileStatus status='Hello World!' />); // create фейковое создание компаненты
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('Hello World!');
    });

    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status='Hello World!' />); // create фейковое создание компаненты
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('Hello World!');
    });

    test("callback should be called", () => {
        const mockCallback = jest.fn(); // фейковая ф-ция
        const component = create(<ProfileStatus status='Hello World!' updateStatus={mockCallback} />); // create фейковое создание компаненты
        const instance = component.getInstance();
        instance.deactivateEditMode(); // в этой ф-ции вызывается updateStatus
        expect(mockCallback.mock.calls.length).toBe(1); // считаем сколько раз вызвали ф-цию mockCallback
        // если закомментировать в ProfileStatus.jsx ф-цию this.props.updateStatus(this.state.status) будет ошибка, получим 0
    });
});