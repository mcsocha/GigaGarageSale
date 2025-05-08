export interface IReservationRequest {
    /**
     * Amount to reserve or release.
     */
    quantity: number;

    /**
     * True to reserve and decrement available inventory, False to release and increment.
     */
    reserve: boolean;
}