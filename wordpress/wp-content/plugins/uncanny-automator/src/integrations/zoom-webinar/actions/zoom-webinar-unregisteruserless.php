<?php

namespace Uncanny_Automator;

/**
 * Class ZOOM_WEBINAR_UNREGISTERUSERLESS
 *
 * @package Uncanny_Automator
 */
class ZOOM_WEBINAR_UNREGISTERUSERLESS {

	/**
	 * Integration code
	 *
	 * @var string
	 */
	public static $integration = 'ZOOMWEBINAR';

	private $action_code;
	private $action_meta;
	private $helpers;

	/**
	 * Set up Automator action constructor.
	 */
	public function __construct() {
		$this->action_code = 'ZOOMWEBINARUNREGISTERUSERLESS';
		$this->action_meta = 'ZOOMWEBINAR';
		$this->helpers     = new Zoom_Webinar_Helpers();
		$this->define_action();
	}

	/**
	 * Define and register the action by pushing it into the Automator object
	 */
	public function define_action() {

		$action = array(
			'author'                => Automator()->get_author_name( $this->action_code ),
			'support_link'          => Automator()->get_author_support_link( $this->action_code, 'knowledge-base/zoom/' ),
			'is_pro'                => false,
			'requires_user'         => false,
			'integration'           => self::$integration,
			'code'                  => $this->action_code,
			/* translators: Webinar topic */
			'sentence'              => sprintf( __( 'Remove an attendee from {{a webinar:%1$s}}', 'uncanny-automator' ), $this->action_meta ),
			'select_option_name'    => __( 'Remove an attendee from {{a webinar}}', 'uncanny-automator' ),
			'priority'              => 10,
			'accepted_args'         => 1,
			'execution_function'    => array( $this, 'zoom_webinar_unregister_user' ),
			'options_callback'      => array( $this, 'load_options' ),
			'background_processing' => true,

		);

		Automator()->register->action( $action );
	}

	/**
	 * load_options
	 *
	 * @return void
	 */
	public function load_options() {

		$email_field_options = array(
			'option_code' => 'EMAIL',
			'input_type'  => 'text',
			'label'       => esc_attr__( 'Email address', 'uncanny-automator' ),
			'placeholder' => '',
			'description' => '',
			'required'    => true,
			'tokens'      => true,
			'default'     => '',
		);

		$email_field = Automator()->helpers->recipe->field->text( $email_field_options );

		$account_users_field = array(
			'option_code'           => 'ZOOMUSER',
			'label'                 => __( 'Account user', 'uncanny-automator' ),
			'input_type'            => 'select',
			'required'              => false,
			'is_ajax'               => true,
			'endpoint'              => 'uap_zoom_api_get_webinars',
			'fill_values_in'        => $this->action_meta,
			'options'               => $this->helpers->get_account_user_options(),
			'relevant_tokens'       => array(),
			'supports_custom_value' => false,
		);

		$user_webinars_field = array(
			'option_code'           => $this->action_meta,
			'label'                 => __( 'Webinar', 'uncanny-automator' ),
			'input_type'            => 'select',
			'required'              => true,
			'options'               => array(),
			'supports_tokens'       => false,
			'supports_custom_value' => false,
		);

		$option_fileds = array(
			$email_field,
			$account_users_field,
			$user_webinars_field,
		);

		//Don't show the user dropdown to old credentials so it's easier to test the update
		if ( $this->helpers->jwt_mode() ) {
			$option_fileds = array(
				$email_field,
				$this->helpers->get_webinars_field(),
			);
		}

		return array(
			'options_group' => array(
				$this->action_meta => $option_fileds,
			),
		);

	}

	/**
	 * Validation function when the action is hit
	 *
	 * @param $user_id
	 * @param $action_data
	 * @param $recipe_id
	 */
	public function zoom_webinar_unregister_user( $user_id, $action_data, $recipe_id, $args ) {

		try {
			$webinar_key = Automator()->parse->text( $action_data['meta'][ $this->action_meta ], $recipe_id, $user_id, $args );
			$email       = Automator()->parse->text( $action_data['meta']['EMAIL'], $recipe_id, $user_id, $args );

			if ( empty( $webinar_key ) ) {
				throw new \Exception( __( 'Webinar was not found.', 'uncanny-automator' ) );
			}

			$webinar_key = str_replace( '-objectkey', '', $webinar_key );

			$result = Automator()->helpers->recipe->zoom_webinar->unregister_user( $email, $webinar_key, $action_data );

			Automator()->complete_action( $user_id, $action_data, $recipe_id );

		} catch ( \Exception $e ) {
			$action_data['complete_with_errors'] = true;
			Automator()->complete_action( $user_id, $action_data, $recipe_id, $e->getMessage() );
		}
	}
}
