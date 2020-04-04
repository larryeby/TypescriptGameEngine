import { IGameObject } from '../../game-objects/interfaces/gameobject.interface';

export interface ICollider {
    colliderType: ColliderType;
    checkCollisions: (parent: IGameObject, input: IGameObject) => void;
}

export enum ColliderType {
    Box,
    Circle
}